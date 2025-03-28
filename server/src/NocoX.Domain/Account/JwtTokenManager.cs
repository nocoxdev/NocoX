using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;
using Microsoft.IdentityModel.Tokens;
using NocoX.Localization;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;

namespace NocoX.Account;

public class JwtTokenManager(
    JwtConfig jwtConfig,
    IRepository<RefreshToken, Guid> refreshTokenRepository,
    IStringLocalizer<NocoXResource> localizer
) : DomainService
{
    private readonly byte[] _secret = Encoding.ASCII.GetBytes(jwtConfig.Secret);

    public async Task RemoveExpiredRefreshTokensAsync(DateTime now)
    {
        var expiredTokens = await refreshTokenRepository.GetListAsync(x => x.ExpireTime < now);
        await refreshTokenRepository.DeleteManyAsync(expiredTokens);
    }

    public async Task RemoveRefreshTokenByUserNameAsync(string? userName)
    {
        var refreshTokens = await refreshTokenRepository.GetListAsync(x => x.UserName == userName);
        await refreshTokenRepository.DeleteManyAsync(refreshTokens);
    }

    public AuthResult GenerateTokens(string userName, Claim[] claims, DateTime now)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfig.Secret));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            jwtConfig.Issuer,
            jwtConfig.Audience,
            claims,
            expires: now.AddMonths(jwtConfig.AccessTokenExpiration),
            signingCredentials: credentials
        );

        var accessToken = new JwtSecurityTokenHandler().WriteToken(token);

        var refreshToken = new RefreshToken
        {
            UserName = userName,
            Token = GuidGenerator.Create().ToString(),
            ExpireTime = now.AddMonths(1),
        };

        return new AuthResult { AccessToken = accessToken, RefreshToken = refreshToken };
    }

    public (ClaimsPrincipal, JwtSecurityToken?) DecodeJwtToken(string token)
    {
        if (string.IsNullOrWhiteSpace(token))
        {
            throw new SecurityTokenException(localizer["Invalid token"]);
        }

        var principal = new JwtSecurityTokenHandler().ValidateToken(
            token,
            new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = jwtConfig.Issuer,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(_secret),
                ValidAudience = jwtConfig.Audience,
                ValidateAudience = true,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.FromMinutes(1),
            },
            out var validatedToken
        );

        return (principal, validatedToken as JwtSecurityToken);
    }

    public async Task<AuthResult> RefreshAsync(string refreshToken, string accessToken, DateTime now)
    {
        var (principal, jwtToken) = DecodeJwtToken(accessToken);
        if (jwtToken == null || !jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256Signature))
        {
            throw new SecurityTokenException(localizer["Invalid token"]);
        }

        var userName = principal.Identity?.Name;

        var existingRefreshToken = await refreshTokenRepository.SingleOrDefaultAsync(x =>
            x.UserName == userName && refreshToken == x.Token
        );

        if (existingRefreshToken == null)
        {
            throw new SecurityTokenException(localizer["Invalid token"]);
        }

        if (existingRefreshToken.UserName != userName || existingRefreshToken.ExpireTime < now)
        {
            throw new SecurityTokenException(localizer["Invalid token"]);
        }

        return GenerateTokens(userName, principal.Claims.ToArray(), now); // need to recover the original claims
    }
}
