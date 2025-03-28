using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Common.Dtos;
using NocoX.Identity.Dtos;
using NocoX.Permissions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp.Application.Dtos;

namespace NocoX.Identity;

[ApiController]
[Route("api/user")]
[Authorize]
[PermissionGroup(SettingUserPermissions.GroupName)]
public class UserController(IUserAppService userAppService) : NocoXController
{
    [HttpPost]
    [Route("create")]
    [Permission(SettingUserPermissions.Create)]
    public Task<Result> Create([FromBody] CreateUserInput input)
    {
        return userAppService.CreateAsync(input);
    }

    [HttpPost]
    [Route("update")]
    [Permission(SettingUserPermissions.Update)]
    public Task<Result> Update([FromBody] UpdateUserInput input)
    {
        return userAppService.UpdateAsync(input);
    }

    [HttpPost]
    [Route("resetPassword")]
    [Permission(SettingUserPermissions.Update)]
    public Task<Result> ResetPassword([FromBody] ResetPasswordInput input)
    {
        return userAppService.ResetPasswordAsync(input);
    }


    [HttpPost]
    [Route("getPageList")]
    [Permission(SettingUserPermissions.View)]
    public Task<DataResult<PagedResultDto<UserGetOutputDto>>> GetPageList([FromBody] QueryPageListParamsInput input)
    {
        return userAppService.GetPageListAsync(input);
    }

    [HttpPost]
    [Route("getList")]
    [Permission(SettingUserPermissions.View)]
    public Task<DataResult<List<UserGetOutputDto>>> GetList([FromBody] QueryListParamsInput input)
    {
        return userAppService.GetListAsync(input);
    }

    [HttpGet]
    [Route("get")]
    [Permission(SettingUserPermissions.View)]
    public Task<DataResult<UserGetOutputDto>> Get([FromQuery] Guid id)
    {
        return userAppService.GetAsync(id);
    }

    [HttpPost]
    [Route("delete")]
    [Permission(SettingUserPermissions.Delete)]
    public Task<Result> Delete([FromBody] OnlyIdInput input)
    {
        return userAppService.DeleteAsync(input.Id);
    }

    [HttpPost]
    [Route("freeze")]
    [Permission(SettingUserPermissions.Freeze)]
    public Task<Result> Freeze([FromBody] OnlyIdInput input)
    {
        return userAppService.FreezeAsync(input.Id);
    }

    [HttpPost]
    [Route("unfreeze")]
    [Permission(SettingUserPermissions.Freeze)]
    public Task<Result> Unfreeze([FromBody] OnlyIdInput input)
    {
        return userAppService.UnfreezeAsync(input.Id);
    }
}
