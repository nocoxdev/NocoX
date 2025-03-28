using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Common.Dtos;
using NocoX.Identity.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace NocoX.Identity;

public interface IUserAppService : IApplicationService
{
    Task<Result> CreateAsync(CreateUserInput input);

    Task<Result> UpdateAsync(UpdateUserInput input);

    Task<DataResult<UserGetOutputDto>> GetAsync(Guid id);

    Task<DataResult<PagedResultDto<UserGetOutputDto>>> GetPageListAsync(QueryPageListParamsInput input);

    Task<DataResult<List<UserGetOutputDto>>> GetListAsync(QueryListParamsInput input);

    Task<Result> ResetPasswordAsync(ResetPasswordInput input);

    Task<Result> DeleteAsync(Guid id);

    Task<Result> FreezeAsync(Guid id);

    Task<Result> UnfreezeAsync(Guid id);
}
