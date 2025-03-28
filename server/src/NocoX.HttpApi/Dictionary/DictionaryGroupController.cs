using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NocoX.Common.Dtos;
using NocoX.Dictionary.Dtos;
using NocoX.Permissions;
using Volo.Abp.Application.Dtos;

namespace NocoX.Dictionary;

[ApiController]
[Authorize]
[Route("api/dictionaryGroup")]
[PermissionGroup(DictionaryPermissions.GroupName)]
public class DictionaryGroupController(IDictionaryGroupAppService groupAppService) : NocoXController
{
    [HttpGet]
    [Route("getPageList")]
    [Permission(DictionaryPermissions.View)]
    public Task<DataResult<PagedResultDto<DictionaryGroupGetDto>>> GetPageList([FromQuery] PageListInput input)
    {
        return groupAppService.GetPageListAsync(input);
    }

    [HttpGet]
    [Route("getList")]
    [Permission(DictionaryPermissions.View)]
    public Task<DataResult<List<DictionaryGroupGetDto>>> GetList([FromQuery] QueryKeywordsInput input)
    {
        return groupAppService.GetListAsync(input);
    }

    [HttpPost]
    [Route("create")]
    [Permission(DictionaryPermissions.Create)]
    public Task<Result> Create([FromBody] CreateDictionaryGroupInput input)
    {
        return groupAppService.CreateAsync(input);
    }

    [HttpPost]
    [Route("update")]
    [Permission(DictionaryPermissions.Update)]
    public Task<Result> Update([FromBody] UpdateDictionaryGroupInput input)
    {
        return groupAppService.UpdateAsync(input);
    }
}
