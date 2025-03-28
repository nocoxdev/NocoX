using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Account.Dtos;
using NocoX.Common.Dtos;
using Volo.Abp.Application.Services;

namespace NocoX.Account;

public interface IAccountAppService : IApplicationService
{
    Task<DataResult<LoginResultDto>> LoginAsync(LoginInput input);

    Task<Result> LogoutAsync();

    Task<DataResult<LoginResultDto>> RefreshTokenAsync(RefreshTokenInput input);

    Task<DataResult<UserGetProfileDto>> GetProfileAsync();

    Task<Result> UpdateProfileAsync(UpdateUserProfileInput input);

    Task<Result> CheckCurrentUserAsync();

    Task<Result> ChangePasswordAsync(ChangePasswordInput input);

    Task<DataResult<List<UserPermissionGetDto>>> GetPermissionsAsync();
}
