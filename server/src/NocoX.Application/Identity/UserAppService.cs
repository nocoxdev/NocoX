using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Common.Converters;
using NocoX.Common.Dtos;
using NocoX.Identity.Dtos;
using Volo.Abp;
using Volo.Abp.Application.Dtos;

namespace NocoX.Identity;

public class UserAppService(IUserRepository userRepository, UserManager userManager)
    : NocoXApplicationService,
        IUserAppService
{
    /// <summary>
    /// create user
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    public async Task<Result> CreateAsync(CreateUserInput input)
    {
        var user = new User(GuidGenerator.Create(), input.UserName, input.Email, input.Password, input.PhoneNumber);

        await userManager.CreateAsync(user, input.Roles);

        return Success();
    }

    public async Task<Result> UpdateAsync(UpdateUserInput input)
    {
        var user = await userRepository.GetAsync(input.Id);

        Check.NotNull(user, nameof(user));

        user.SetUserName(input.UserName);
        user.SetEmail(input.Email);
        user.SetPhoneNumber(input.PhoneNumber);

        await userManager.UpdateAsync(user, input.Roles);

        return Success();
    }

    /// <summary>
    /// get user list
    /// </summary>
    /// <returns></returns>
    /// <exception cref="NotImplementedException"></exception>
    public async Task<DataResult<PagedResultDto<UserGetOutputDto>>> GetPageListAsync(QueryPageListParamsInput input)
    {
        var (users, total) = await userRepository.GetResultPageListAsync(
            input.PageIndex,
            input.PageSize,
            input.Filter.ToDataFilter(),
            input.Sorts.ToDataSorts(),
            input.Keywords ?? ""
        );

        var result = new PagedResultDto<UserGetOutputDto>(
            total,
            ObjectMapper.Map<List<UserQueryItem>, List<UserGetOutputDto>>(users)
        );
        return DataSuccess(result);
    }

    /// <summary>
    /// reset password
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    /// <exception cref="Exception"></exception>
    public async Task<Result> ResetPasswordAsync(ResetPasswordInput input)
    {
        var user = await userRepository.GetAsync(input.Id);

        await userManager.UpdatePasswordAsync(user, input.NewPassword, input.ConfirmPassword);

        return Success();
    }

    public async Task<DataResult<UserGetOutputDto>> GetAsync(Guid id)
    {
        var user = await userRepository.GetResultByIdAsync(id);

        return DataSuccess(ObjectMapper.Map<UserQueryItem, UserGetOutputDto>(user));
    }

    public async Task<Result> DeleteAsync(Guid id)
    {
        var user = await userRepository.GetAsync(id);

        await userManager.DeleteAsync(user);

        return Success();
    }

    public async Task<DataResult<List<UserGetOutputDto>>> GetListAsync(QueryListParamsInput input)
    {
        var users = await userRepository.GetResultListAsync(
            input.Filter.ToDataFilter(),
            input.Sorts.ToDataSorts(),
            input.Keywords ?? ""
        );

        return DataSuccess(ObjectMapper.Map<List<UserQueryItem>, List<UserGetOutputDto>>(users));
    }

    public async Task<Result> FreezeAsync(Guid id)
    {
        var user = await userRepository.GetAsync(id);

        user.Status = UserStatus.Frozen;

        await userRepository.UpdateAsync(user);

        return Success();
    }

    public async Task<Result> UnfreezeAsync(Guid id)
    {
        var user = await userRepository.GetAsync(id);

        user.Status = UserStatus.Normal;

        await userRepository.UpdateAsync(user);

        return Success();
    }
}
