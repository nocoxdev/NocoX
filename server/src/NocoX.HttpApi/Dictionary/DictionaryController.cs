using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NocoX.Common.Dtos;
using NocoX.Dictionary.Dtos;
using Volo.Abp.Application.Dtos;

namespace NocoX.Dictionary;

[ApiController]
[Authorize]
[Route("api/dictionary")]
public class DictionaryController(IDictionaryDataAppService dictionaryDataAppService) : NocoXController
{
    [HttpGet]
    [Route("get")]
    public Task<DictionaryDataGetDto> Get(Guid id)
    {
        return dictionaryDataAppService.GetAsync(id);
    }

    [HttpGet]
    [Route("getPageList")]
    public Task<DataResult<PagedResultDto<DictionaryDataGetDto>>> GetPageList(
        [FromQuery] DictionaryDataGetPageListInput input
    )
    {
        return dictionaryDataAppService.GetPageListAsync(input);
    }

    [HttpGet]
    [Route("getList")]
    public Task<DataResult<List<DictionaryDataGetDto>>> GetList([FromQuery] DictionaryDataGetListInput input)
    {
        return dictionaryDataAppService.GetListAsync(input);
    }

    [HttpGet]
    [Route("getChildren")]
    public Task<DataResult<List<DictionaryDataGetDto>>> GetChildren(Guid groupId)
    {
        return dictionaryDataAppService.GetChildrenAsync(groupId);
    }

    [HttpPost]
    [Route("add")]
    public Task<Result> Add([FromBody] AddDictionaryDataInput input)
    {
        return dictionaryDataAppService.AddAsync(input);
    }

    [HttpPost]
    [Route("update")]
    public Task<Result> Update([FromBody] UpdateDictionaryDataInput input)
    {
        return dictionaryDataAppService.UpdateAsync(input);
    }

    [HttpPost]
    [Route("delete")]
    public Task<Result> Delete(OnlyIdInput input)
    {
        return dictionaryDataAppService.DeleteAsync(input.Id);
    }

    [HttpPost]
    [Route("enable")]
    public Task<Result> Enable(OnlyIdInput input)
    {
        return dictionaryDataAppService.EnableAsync(input.Id);
    }

    [HttpPost]
    [Route("disable")]
    public Task<Result> Disable(OnlyIdInput input)
    {
        return dictionaryDataAppService.DisableAsync(input.Id);
    }
}
