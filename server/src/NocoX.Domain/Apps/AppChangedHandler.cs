using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EventBus;

namespace NocoX.Apps;

public class AppChangedHandler(
    IAppHistoryRepository historyRepository,
    AppHistoryManager historyManager,
    IConfiguration configuration
) : ILocalEventHandler<AppChangedEvent>, ITransientDependency
{
    /// <summary>
    /// If saving is not forced, data will be saved at some(from config file,default value is 3 min)-minute intervals.
    /// </summary>
    /// <param name="eventData"></param>
    /// <returns></returns>
    public async Task HandleEventAsync(AppChangedEvent eventData)
    {
        var latestHistory = await historyRepository.GetLatestAynsc(eventData.AppId);

        var interval = configuration.GetValue<int>("AppBackupInterval");

        if (
            latestHistory != null
            && eventData.Forced != true
            && latestHistory.CreationTime.AddMinutes(interval) > DateTime.Now
        )
        {
            return;
        }

        await historyManager.AddHistoryAsync(eventData.AppId, eventData.Comment ?? "");
    }
}
