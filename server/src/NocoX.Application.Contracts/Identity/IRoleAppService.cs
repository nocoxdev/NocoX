using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Common.Dtos;
using NocoX.Identity.Dtos;
using NocoX.Permissions.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace NocoX.Identity;

public interface IRoleAppService : IApplicationService
{
    Task<Result> CreateAsync(CreateRoleInput input);

    Task<Result> UpdateAsync(UpdateRoleInput input);

    Task<Result> DeleteAsync(Guid id);

    Task<Result> DisableAsync(Guid id);

    Task<Result> EnableAsync(Guid id);

    Task<DataResult<RoleGetDto>> GetAsync(Guid id);

    Task<DataResult<List<RoleGetDto>>> GetListAsync();

    Task<DataResult<PagedResultDto<RoleGetDto>>> GetPageListAsync(QueryPageListParamsInput input);

    Task<Result> SetPermissionsAsync(SetRolePermissionsInput input);

    Task<DataResult<RolePermissionsGetDto>> GetPermissionsAsync(Guid id);
}
