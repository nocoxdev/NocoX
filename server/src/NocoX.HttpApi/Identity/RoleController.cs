using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NocoX.Common.Dtos;
using NocoX.Identity.Dtos;
using NocoX.Permissions;
using NocoX.Permissions.Dtos;
using Volo.Abp.Application.Dtos;

namespace NocoX.Identity;

[ApiController]
[Authorize]
[Route("api/role")]
[PermissionGroup(SettingRolePermissions.GroupName)]
public class RoleController(IRoleAppService roleAppService) : NocoXController
{
    [HttpPost]
    [Route("create")]
    [Permission(SettingRolePermissions.Create)]
    public Task<Result> Create([FromBody] CreateRoleInput input)
    {
        return roleAppService.CreateAsync(input);
    }

    [HttpPost]
    [Route("update")]
    [Permission(SettingRolePermissions.Update)]
    public Task<Result> Update([FromBody] UpdateRoleInput input)
    {
        return roleAppService.UpdateAsync(input);
    }

    [HttpPost]
    [Route("delete")]
    [Permission(SettingRolePermissions.Delete)]
    public Task<Result> Delete([FromBody] OnlyIdInput input)
    {
        return roleAppService.DeleteAsync(input.Id);
    }

    [HttpPost]
    [Route("enable")]
    [Permission(SettingRolePermissions.Delete)]
    public Task<Result> Enable([FromBody] OnlyIdInput input)
    {
        return roleAppService.EnableAsync(input.Id);
    }

    [HttpPost]
    [Route("disable")]
    [Permission(SettingRolePermissions.Delete)]
    public Task<Result> Disable([FromBody] OnlyIdInput input)
    {
        return roleAppService.DisableAsync(input.Id);
    }

    [HttpGet]
    [Route("get")]
    [Permission(SettingRolePermissions.View)]
    public Task<DataResult<RoleGetDto>> Get(Guid id)
    {
        return roleAppService.GetAsync(id);
    }

    [HttpGet]
    [Route("getList")]
    [Permission(SettingRolePermissions.View)]
    public Task<DataResult<List<RoleGetDto>>> GetList()
    {
        return roleAppService.GetListAsync();
    }

    [HttpPost]
    [Route("getPageList")]
    [Permission(SettingRolePermissions.View)]
    public Task<DataResult<PagedResultDto<RoleGetDto>>> GetPageList([FromBody] QueryPageListParamsInput input)
    {
        return roleAppService.GetPageListAsync(input);
    }

    [HttpPost]
    [Route("setPermissions")]
    [Permission(SettingRolePermissions.Permissions)]
    public Task<Result> SetPermissions([FromBody] SetRolePermissionsInput input)
    {
        return roleAppService.SetPermissionsAsync(input);
    }

    [HttpGet]
    [Route("getPermissions")]
    [Permission(SettingRolePermissions.Permissions)]
    public Task<DataResult<RolePermissionsGetDto>> GetPermissions(Guid id)
    {
        return roleAppService.GetPermissionsAsync(id);
    }
}
