using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Layda.EntityFrameworkCore.Common;
using Microsoft.EntityFrameworkCore;
using NocoX.Apps;
using NocoX.Common;
using NocoX.Identity;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace NocoX.EntityFrameworkCore.Apps;

public class AppHistoryRepository(IDbContextProvider<NocoXDbContext> dbContextProvider)
    : EfCoreRepository<NocoXDbContext, AppHistory, Guid>(dbContextProvider),
        IAppHistoryRepository
{
    public async Task<AppHistory?> GetLatestAynsc(Guid appId)
    {
        return await (await GetQueryableAsync()).OrderByDescending(x => x.CreationTime).FirstOrDefaultAsync();
    }

    public async Task<(List<HistoryQueryItem> histories, int total)> GetPageListAsync(
        Guid appId,
        int pageIndex,
        int pageSize,
        DataFilter? filter,
        List<DataSort> sorts,
        string keywords
    )
    {
        var dbContext = await GetDbContextAsync();

        var queryable =
            from history in dbContext
                .Set<AppHistory>()
                .WhereIf(!string.IsNullOrWhiteSpace(keywords), x => x.Comment.Contains(keywords))
                .ApplyDataFilter(filter)
                .ApplyDataSort(sorts)
            where history.AppId == appId
            join creator in dbContext
                .Set<User>()
                .WhereIf(!string.IsNullOrWhiteSpace(keywords), x => x.UserName.Contains(keywords))
                on history.CreatorId equals creator.Id
            select new HistoryQueryItem
            {
                Id = history.Id,
                AppId = history.AppId,
                Comment = history.Comment,
                CreationTime = history.CreationTime,
                Creator = creator.UserName,
            };

        var histories = await queryable.TakePage(pageIndex, pageSize).ToListAsync();

        var total = await queryable.CountAsync();

        return (histories, total);
    }
}
