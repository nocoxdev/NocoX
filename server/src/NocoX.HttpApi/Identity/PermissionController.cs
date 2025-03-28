using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Common.Dtos;
using NocoX.Permissions;
using NocoX.Permissions.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace NocoX.Identity;

[ApiController]
[Authorize]
[Route("api/permission")]
public class PermissionController(IPermissionAppService permissionAppService) : NocoXController
{
    [HttpGet]
    [Route("getList")]
    [Permission(SettingRolePermissions.Permissions, SettingRolePermissions.GroupName)]
    public Task<DataResult<List<PermissionGroupGetDto>>> GetList()
    {
        return permissionAppService.GetListAsync();
    }
}
