using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NocoX.Apps.Dtos;
using NocoX.Common.Dtos;
using Volo.Abp.Application.Dtos;

namespace NocoX.Apps;

[ApiController]
[Authorize]
[Route("api/app")]
public class AppController(IAppAppService appAppService) : NocoXController
{
    [HttpGet]
    [Route("getPageList")]
    public Task<DataResult<PagedResultDto<AppGetDto>>> GetPageList([FromQuery] AppGetPageListInput input)
    {
        return appAppService.GetPageListAsync(input);
    }

    [HttpGet]
    [Route("get")]
    public Task<DataResult<AppGetDto>> Get(Guid id)
    {
        return appAppService.GetAsync(id);
    }

    [HttpGet]
    [Route("getPreviewApp")]
    public Task<DataResult<RunningAppGetDto>> getPreviewApp(Guid id)
    {
        return appAppService.GetPreviewAppAsync(id);
    }


    [HttpPost]
    [Route("create")]
    public Task<DataResult<AppGetDto>> Create([FromBody] CreateAppInput input)
    {
        return appAppService.CreateAsync(input);
    }

    [HttpPost]
    [Route("changeFavicon")]
    public Task<DataResult<AppGetDto>> ChangeFavicon([FromBody] ChangeAppFaviconInput input)
    {
        return appAppService.ChangeFaviconAsync(input);
    }

    [HttpPost]
    [Route("changeColor")]
    public Task<DataResult<AppGetDto>> ChangeColor([FromBody] ChangeAppColorInput input)
    {
        return appAppService.ChangeColorAsync(input);
    }

    [HttpPost]
    [Route("modifyTitle")]
    public Task<DataResult<AppGetDto>> ModifyTitle([FromBody] ModifyAppTitleInput input)
    {
        return appAppService.ModifyTitleAsync(input);
    }

    [HttpPost]
    [Route("delete")]
    public Task<Result> Delete([FromBody] OnlyIdInput input)
    {
        return appAppService.DeleteAsync(input.Id);
    }

    [HttpPost]
    [Route("addRoles")]
    public Task<Result> AddRoles([FromBody] ChangeAppRolesInput input)
    {
        return appAppService.AddRolesAsync(input);
    }

    [HttpPost]
    [Route("removeRoles")]
    public Task<Result> RemoveRoles([FromBody] ChangeAppRolesInput input)
    {
        return appAppService.RemoveRolesAsync(input);
    }

    [HttpGet]
    [Route("getRoles")]
    public Task<DataResult<List<AppRoleGetDto>>> GetRoles(Guid id)
    {
        return appAppService.GetRolesAsync(id);
    }

    [HttpGet]
    [Route("getLatestVersion")]
    public Task<DataResult<AppReleaseVersionGetDto>> GetLatestVersion(Guid id)
    {
        return appAppService.GetLatestVersionAsync(id);
    }

    [HttpGet]
    [Route("getUnGrantedRoles")]
    public Task<DataResult<List<AppRoleGetDto>>> GetUnGrantedRoles([FromQuery] AppGetUnGrantedRoleInput input)
    {
        return appAppService.GetUnGrantedRolesAsync(input);
    }

    [HttpPost]
    [Route("release")]
    public Task<Result> Release([FromBody] AddAppReleaseInput input)
    {
        return appAppService.ReleaseAsync(input);
    }

    [HttpPost]
    [Route("restore")]
    public Task<Result> Restore([FromBody] RestoreAppInput input)
    {
        return appAppService.RestoreAsync(input);
    }
}
