using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Apps.Dtos;
using NocoX.Common.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace NocoX.Apps;

[ApiController]
[Authorize]
[Route("api/app/page")]
public class AppPageController(IAppPageAppService pageAppService) : NocoXController
{
    [HttpPost]
    [Route("update")]
    public Task<Result> Update([FromBody] UpdatePageInput input)
    {
        return pageAppService.UpdateAsync(input);
    }

    [HttpGet]
    [Route("getList")]
    public Task<DataResult<List<PageGetDto>>> GetList(Guid appId)
    {
        return pageAppService.GetListAsync(appId);
    }

    [HttpGet]
    [Route("getHistoryPageList")]
    public Task<DataResult<List<PageGetDto>>> GetHistoryPageList(Guid appId)
    {
        return pageAppService.GetListAsync(appId);
    }

    [HttpPost]
    [Route("add")]
    public Task<DataResult<PageGetDto>> Add([FromBody] AddPageInput input)
    {
        return pageAppService.AddAsync(input);
    }

    [HttpPost]
    [Route("reorder")]
    public Task<Result> Reorder([FromBody] ReorderInput input)
    {
        return pageAppService.Reorder(input);
    }

    [HttpPost]
    [Route("updateContent")]
    public Task<Result> UpdateContent([FromBody] UpdatePageContentInput input)
    {
        return pageAppService.UpdateContentAsync(input);
    }

    [HttpPost]
    [Route("delete")]
    public Task<Result> Delete([FromBody] OnlyIdInput input)
    {
        return pageAppService.DeleteAsync(input.Id);
    }

    [HttpPost]
    [Route("enable")]
    public Task<Result> Enable(OnlyIdInput input)
    {
        return pageAppService.EnableAsync(input.Id);
    }

    [HttpPost]
    [Route("disable")]
    public Task<Result> Disable(OnlyIdInput input)
    {
        return pageAppService.DisableAsync(input.Id);
    }
}
