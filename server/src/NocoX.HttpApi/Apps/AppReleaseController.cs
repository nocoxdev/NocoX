using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NocoX.Apps.Dtos;
using NocoX.Common.Dtos;
using NocoX.Permissions;
using Volo.Abp.Application.Dtos;

namespace NocoX.Apps;

[ApiController]
[Authorize]
[Route("api/appRelease")]
[PermissionGroup(ReleaseAppPermissions.GroupName)]
public class AppReleaseController(IAppReleaseAppService appReleaseAppService) : NocoXController
{
    [HttpGet]
    [Route("getMyApps")]
    public Task<DataResult<List<MyAppGetDto>>> GetMyApps()
    {
        return appReleaseAppService.GetMyAppsAsync();
    }

    [HttpGet]
    [Route("get")]
    [Permission(ReleaseAppPermissions.View)]
    public Task<DataResult<AppReleaseGetDto>> Get(Guid id)
    {
        return appReleaseAppService.GetAync(id);
    }

    [HttpGet]
    [Route("getPageList")]
    [Permission(ReleaseAppPermissions.View)]
    public Task<DataResult<PagedResultDto<AppReleaseGetDto>>> GetPageList(
        [FromQuery] QueryPageListParamsInput input
    )
    {
        return appReleaseAppService.GetPageListAsync(input);
    }

    [HttpGet]
    [Route("getRunningApp")]
    public Task<DataResult<RunningAppGetDto>> GetRunningApp(Guid id)
    {
        return appReleaseAppService.GetRunningAppAsync(id);
    }

    [HttpGet]
    [Route("getInfo")]
    [Permission(ReleaseAppPermissions.View)]
    public Task<DataResult<AppReleaseInfoGetDto>> GetInfo(Guid id)
    {
        return appReleaseAppService.GetInfoAsync(id);
    }

    [HttpGet]
    [Route("getAllVersions")]
    [Permission(ReleaseAppPermissions.View)]
    public Task<DataResult<List<AppReleaseVersionGetDto>>> GetAllVersions(Guid appId)
    {
        return appReleaseAppService.GetAllVersionsAsync(appId);
    }

    [HttpPost]
    [Route("update")]
    [Permission(ReleaseAppPermissions.Update)]
    public Task<Result> Update([FromBody] UpdateAppReleaseInput input)
    {
        return appReleaseAppService.UpdateAsync(input);
    }

    [HttpPost]
    [Route("delete")]
    [Permission(ReleaseAppPermissions.Delete)]
    public Task<Result> Delete([FromBody] OnlyIdInput input)
    {
        return appReleaseAppService.DeleteAsync(input.Id);
    }

    [HttpPost]
    [Route("rollback")]
    [Permission(ReleaseAppPermissions.Delete)]
    public Task<Result> Rollback([FromBody] OnlyIdInput input)
    {
        return appReleaseAppService.RollbackAsync(input.Id);
    }
}
