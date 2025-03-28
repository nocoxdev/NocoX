using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;
using NocoX.Account.Dtos;
using NocoX.Common.Dtos;
using NocoX.Identity;
using NocoX.Localization;
using NocoX.Permissions;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Users;

namespace NocoX.Account;

public class AccountAppService(
    AccountManager accountManager,
    IUserRepository userRepository,
    ICurrentUser currentUser,
    IStringLocalizer<NocoXResource> localizer
) : NocoXApplicationService, IAccountAppService
{
    public async Task<Result> ChangePasswordAsync(ChangePasswordInput input)
    {
        if (input.NewPassword != input.ConfirmPassword)
        {
            return Fail(localizer["The two passwords do not match."]);
        }

        await accountManager.ChangePasswordAsync(input.OldPassword, input.NewPassword);

        return Success();
    }

    public async Task<Result> CheckCurrentUserAsync()
    {
        if (currentUser.Id == null)
        {
            return Fail(localizer["User is not exist"]);
        }

        var user = await userRepository.SingleOrDefaultAsync(x => x.Id == currentUser.Id);

        if (user == null)
        {
            return Fail(localizer["User is not exist"]);
        }

        if (user.Status == UserStatus.Frozen)
        {
            return Fail(localizer["User is frozen"]);
        }

        return Success();
    }

    public async Task<DataResult<List<UserPermissionGetDto>>> GetPermissionsAsync()
    {
        var currentUserId = currentUser.Id ?? throw new Exception(localizer["User is not exist"]);
        var permissions = await userRepository.GetPermissionGrantResultListByIdAsync(currentUserId);

        return DataSuccess(
            ObjectMapper.Map<List<UserPermissionGrantQueryItem>, List<UserPermissionGetDto>>(permissions)
        );
    }

    public async Task<DataResult<UserGetProfileDto>> GetProfileAsync()
    {
        var user =
            CurrentUser.Id == null
                ? throw new Exception(localizer["User is not exist"])
                : await userRepository.GetAsync(CurrentUser.Id.Value);

        return DataSuccess(ObjectMapper.Map<User, UserGetProfileDto>(user));
    }

    /// <summary>
    /// login
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>

    public async Task<DataResult<LoginResultDto>> LoginAsync(LoginInput input)
    {
        var result = await accountManager.LoginAsync(input.Email, input.Password);

        return DataSuccess(ObjectMapper.Map<LoginResultItem, LoginResultDto>(result));
    }

    public async Task<Result> LogoutAsync()
    {
        await accountManager.LogoutAsync();

        return Success();
    }

    public async Task<DataResult<LoginResultDto>> RefreshTokenAsync(RefreshTokenInput input)
    {
        var result = await accountManager.RefreshTokenAsync(input.RefreshToken, input.AccessToken);

        return DataSuccess(ObjectMapper.Map<LoginResultItem, LoginResultDto>(result));
    }

    /// <summary>
    /// update user
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    /// <exception cref="NotImplementedException"></exception>
    public async Task<Result> UpdateProfileAsync(UpdateUserProfileInput input)
    {
        if (CurrentUser.Id == null)
        {
            throw new Exception(localizer["User is not exist"]);
        }

        var id = CurrentUser.Id.Value;
        var user = await userRepository.GetAsync(id);

        user.SetAvatar(input.Avatar ?? "");
        user.SetPhoneNumber(input.PhoneNumber);
        user.SetUserName(input.UserName);
        user.SetEmail(input.Email);
        user.SetDescription(input.Description);

        await userRepository.UpdateAsync(user);

        return Success();
    }
}
