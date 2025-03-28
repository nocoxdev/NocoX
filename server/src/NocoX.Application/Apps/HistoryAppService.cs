using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Apps.Dtos;
using NocoX.Common.Converters;
using NocoX.Common.Dtos;
using Volo.Abp.Application.Dtos;

namespace NocoX.Apps;

public class HistoryAppService(
    IAppHistoryRepository historyRepository,
    AppManager appManager,
    AppHistoryManager historyManager,
    IAppRepository appRepository
) : NocoXApplicationService, IHistoryAppService
{
    public async Task<Result> CommentAsync(CommentHistoryInput input)
    {
        var history = await historyRepository.GetAsync(input.Id);

        await appManager.CheckPermissionAsync(history.AppId);

        history.Comment = input.Comment ?? string.Empty;

        await historyRepository.UpdateAsync(history);

        return Success();
    }

    public async Task<Result> AddAsync(AddHistoryInput input)
    {
        await appManager.CheckPermissionAsync(input.AppId);
        var app = await appRepository.GetAsync(input.AppId);

        await historyManager.AddHistoryAsync(app.Id, input.Comment ?? "");

        return Success();
    }

    public async Task<DataResult<PagedResultDto<HistoryGetPageListDto>>> GetPageListAsync(HistoryPageListInput input)
    {
        await appManager.CheckPermissionAsync(input.AppId);
        var (histories, total) = await historyRepository.GetPageListAsync(
            input.AppId,
            input.PageIndex,
            input.PageSize,
            input.Filter.ToDataFilter(),
            input.Sorts.ToDataSorts(),
            input.Keywords ?? string.Empty
        );

        var result = new PagedResultDto<HistoryGetPageListDto>(
            total,
            ObjectMapper.Map<List<HistoryQueryItem>, List<HistoryGetPageListDto>>(histories)
        );
        return DataSuccess(result);
    }
}
