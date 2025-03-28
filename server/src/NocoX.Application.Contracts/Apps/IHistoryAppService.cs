using System;
using System.Threading.Tasks;
using NocoX.Apps.Dtos;
using NocoX.Common.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace NocoX.Apps;

public interface IHistoryAppService : IApplicationService
{


    Task<DataResult<PagedResultDto<HistoryGetPageListDto>>> GetPageListAsync(HistoryPageListInput input);

    Task<Result> CommentAsync(CommentHistoryInput input);

    Task<Result> AddAsync(AddHistoryInput input);
}
