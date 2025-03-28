using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;
using NocoX.Identity;
using NocoX.Localization;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.Security.Claims;
using Volo.Abp.Users;

namespace NocoX.Account;

public class AccountManager(
    JwtTokenManager tokenManager,
    ICurrentUser currentUser,
    IUserRepository userRepository,
    IStringLocalizer<NocoXResource> localizer
) : DomainService
{
    public async Task<LoginResultItem> LoginAsync(string email, string password)
    {
        var passwordHash = Password.Encypt(password);

        var user =
            await userRepository.SingleOrDefaultAsync(x => x.Email == email && x.Password == passwordHash)
            ?? throw new Exception(localizer["Invalid email or password"]);

        if (user.Status == UserStatus.Frozen)
        {
            throw new Exception(localizer["User is frozen"]);
        }

        var claims = new[]
        {
            new Claim(AbpClaimTypes.Email, user.UserName),
            new Claim(AbpClaimTypes.UserId, user.Id.ToString()),
        };

        var accessToken = tokenManager.GenerateTokens(user.Email, claims, DateTime.Now);

        return await Task.FromResult(
            new LoginResultItem { AccessToken = accessToken.AccessToken, RefreshToken = accessToken.RefreshToken.Token }
        );
    }

    public async Task ChangePasswordAsync(string oldPassword, string newPassword)
    {
        var currentUserId = currentUser.Id ?? throw new Exception(localizer["User is not exist."]);

        var oldPasswordHash = Password.Encypt(oldPassword);
        var newPasswordHash = Password.Encypt(newPassword);
        var user = await userRepository.GetAsync(x => x.Id == currentUserId && x.Password == oldPassword);

        user.Password = newPasswordHash;

        await userRepository.UpdateAsync(user);
    }

    public async Task<LoginResultItem> RefreshTokenAsync(string refreshToken, string accessToken)
    {
        if (string.IsNullOrWhiteSpace(refreshToken))
        {
            throw new Exception(localizer["Invalid token"]);
        }

        var result = await tokenManager.RefreshAsync(refreshToken, accessToken, DateTime.Now);

        var eto = new LoginResultItem { AccessToken = result.AccessToken, RefreshToken = result.RefreshToken.Token };

        return eto;
    }

    public async Task LogoutAsync()
    {
        await tokenManager.RemoveRefreshTokenByUserNameAsync(currentUser.UserName);
    }
}
