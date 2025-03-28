using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.Json;

namespace NocoX.Apps;

public class AppHistoryManager(
    IAppRepository appRepository,
    IAppPageRepository pageRepository,
    IRepository<AppHistory, Guid> historyRepository,
    IJsonSerializer JsonSerializer
) : DomainService
{
    public async Task AddHistoryAsync(Guid appId, string comment)
    {
        var app = await appRepository.SingleOrDefaultAsync(x => x.Id == appId);
        if (app == null)
        {
            return;
        }

        var pages = await pageRepository.GetResultListAsync(appId);

        var historyContent = new
        {
            Pages = pages
                .Select(x => new AppPageQueryItem
                {
                    Content = x.Content ?? string.Empty,
                    Title = x.Title,
                    Order = x.Order,
                })
                .ToList(),
        };

        var history = new AppHistory(appId, comment, JsonSerializer.Serialize(historyContent));
        await historyRepository.InsertAsync(history);
    }
}
