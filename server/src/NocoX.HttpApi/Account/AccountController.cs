using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NocoX.Account.Dtos;
using NocoX.Common.Dtos;
using NocoX.Permissions;

namespace NocoX.Account;

[ApiController]
[Authorize]
[Route("api/account")]
[PermissionGroup(AccountPermissions.GroupName)]
public class AccountController(IAccountAppService accountService) : NocoXController
{
    [AllowAnonymous]
    [HttpPost]
    [Route("login")]
    public Task<DataResult<LoginResultDto>> Login([FromBody] LoginInput input)
    {
        return accountService.LoginAsync(input);
    }

    [HttpPost]
    [Route("refreshToken")]
    public Task<DataResult<LoginResultDto>> RefreshToken([FromBody] RefreshTokenInput input)
    {
        return accountService.RefreshTokenAsync(input);
    }

    [HttpPost("logout")]
    public Task<Result> Logout()
    {
        return accountService.LogoutAsync();
    }

    [HttpGet("getProfile")]
    public Task<DataResult<UserGetProfileDto>> GetProfile()
    {
        return accountService.GetProfileAsync();
    }

    [HttpGet("getPermissions")]
    public Task<DataResult<List<UserPermissionGetDto>>> GetPermissions()
    {
        return accountService.GetPermissionsAsync();
    }

    [HttpPost("updateProfile")]
    [Permission(AccountPermissions.UpdateProfile)]
    public Task<Result> UpdateProfile([FromBody] UpdateUserProfileInput input)
    {
        return accountService.UpdateProfileAsync(input);
    }

    [HttpPost("changePassword")]
    [Permission(AccountPermissions.ChangePassword)]
    public Task<Result> ChangePassword([FromBody] ChangePasswordInput input)
    {
        return accountService.ChangePasswordAsync(input);
    }
}
