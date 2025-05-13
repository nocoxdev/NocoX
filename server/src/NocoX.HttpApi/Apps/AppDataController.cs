using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NocoX.AppDatas;
using NocoX.AppDatas.Dtos;
using NocoX.Common.Dtos;
using Volo.Abp.Application.Dtos;

namespace NocoX.Apps;

[ApiController]
[Authorize]
[Route("api/app/data")]
public class AppDataController(IAppDataAppService appDataAppService) : NocoXController
{
    [HttpPost]
    [Route("add")]
    public Task<Result> Add([FromBody] InsertDataInput input)
    {
        return appDataAppService.AddAsync(input);
    }

    [HttpPost]
    [Route("update")]
    public Task<Result> Update([FromBody] UpdateDataInput input)
    {
        return appDataAppService.UpdateAsync(input);
    }

    [HttpPost]
    [Route("delete")]
    public Task<Result> Delete([FromBody] DeleteDataInput input)
    {
        return appDataAppService.DeleteAsync(input);
    }

    [HttpGet]
    [Route("getByUser")]
    public Task<DataResult<object?>> GetByUser([FromQuery] DataGetByUserInput input)
    {
        return appDataAppService.GetByUserAsync(input);
    }

    [HttpGet]
    [Route("getById")]
    public Task<DataResult<object?>> GetById([FromQuery] DataGetByIdInput input)
    {
        return appDataAppService.GetByIdAsync(input);
    }

    [HttpPost]
    [Route("getPageList")]
    public async Task<DataResult<PagedResultDto<object>>> GetPageList(
        [FromBody] DataGetPageListInput input
    )
    {
        var result = await appDataAppService.GetPageListAsync(input);
        return result;
    }

    [HttpPost]
    [Route("getCount")]
    public Task<DataResult<int>> GetCount([FromBody] DataGetListInput input)
    {
        return appDataAppService.GetCountAsync(input);
    }

    [HttpPost]
    [Route("getList")]
    public Task<DataResult<List<object>>> GetListAsync([FromBody] DataGetListInput input)
    {
        return appDataAppService.GetListAsync(input);
    }
}
