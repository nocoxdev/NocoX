using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Common.Dtos;
using NocoX.Permissions.Dtos;
using Volo.Abp.Application.Services;

namespace NocoX.Permissions;

public interface IPermissionAppService : IApplicationService
{
    Task<DataResult<List<PermissionGroupGetDto>>> GetListAsync();
}
