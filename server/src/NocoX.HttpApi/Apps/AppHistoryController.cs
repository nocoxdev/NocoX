using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NocoX.Apps.Dtos;
using NocoX.Common.Dtos;
using Volo.Abp.Application.Dtos;

namespace NocoX.Apps;

[ApiController]
[Authorize]
[Route("api/app/history")]
public class AppHistoryController(IHistoryAppService historyAppService) : NocoXController
{
    [HttpPost]
    [Route("getPageList")]
    public Task<DataResult<PagedResultDto<HistoryGetPageListDto>>> GetPageList([FromBody] HistoryPageListInput input)
    {
        return historyAppService.GetPageListAsync(input);
    }

    [HttpPost]
    [Route("comment")]
    public Task<Result> Comment([FromBody] CommentHistoryInput input)
    {
        return historyAppService.CommentAsync(input);
    }

    [HttpPost]
    [Route("add")]
    public Task<Result> Add([FromBody] AddHistoryInput input)
    {
        return historyAppService.AddAsync(input);
    }
}
