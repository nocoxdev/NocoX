using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using NocoX.Account;
using NocoX.Common.Dtos;

namespace NocoX;

public static class NocoXAuthenticationExtensions
{
    public static AuthenticationBuilder AddAuthenticationNocoXJwtBearer(
        this IServiceCollection services,
        JwtConfig config
    )
    {
        var authenticationBuilder = services.AddAuthentication(x =>
        {
            x.DefaultAuthenticateScheme = NocoXHttpApiHostConstants.NocoXJwtBearerScheme;
            x.DefaultChallengeScheme = NocoXHttpApiHostConstants.NocoXJwtBearerScheme;
        });

        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = config.Issuer,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(config.Secret)),
            ValidAudience = config.Audience,
            ValidateAudience = true,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromMinutes(1),
        };

        var jwtBearerEvents = new JwtBearerEvents
        {
            //Custom response format to handle token challenge.
            OnChallenge = async jwtContext =>
            {
                jwtContext.HandleResponse();
                jwtContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                jwtContext.Response.ContentType = "application/json";
                var result = new Result(false, "Token is invalid.");
                await jwtContext.Response.WriteAsJsonAsync(result);
            },

            OnMessageReceived = async context =>
            {
                context.Token = context.Request.Headers[NocoXHttpApiHostConstants.NocoXAccessTokenName];
                await Task.CompletedTask;
            },
        };

        return authenticationBuilder.AddJwtBearer(x =>
        {
            x.RequireHttpsMetadata = true;
            x.SaveToken = true;
            x.TokenValidationParameters = tokenValidationParameters;
            x.Events = jwtBearerEvents;
        });
    }
}
