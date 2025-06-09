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
using Volo.Abp.Json;

namespace NocoX.EntityFrameworkCore.Apps;

public class AppReleaseRepository(IDbContextProvider<NocoXDbContext> dbContextProvider, IJsonSerializer jsonSerializer)
    : EfCoreRepository<NocoXDbContext, AppRelease, Guid>(dbContextProvider),
        IAppReleaseRepository
{
    public async Task<List<AppRelease>> GetListByUserAsync(Guid userId)
    {
        var dbContext = await GetDbContextAsync();

        var queryable =
            from appRelease in dbContext.Set<AppRelease>()
            join appRole in dbContext.Set<AppRole>() on appRelease.AppId equals appRole.AppId
            join userRole in dbContext.Set<UserRole>() on appRole.RoleId equals userRole.RoleId
            where userRole.UserId == userId
            select appRelease;

        return [.. queryable.Distinct()];
    }

    public async Task<AppReleaseVersionQueryItem?> GetCurrentVersionAsync(Guid appId)
    {
        var version = await (await GetQueryableAsync())
            .Where(x => x.AppId == appId)
            .OrderByDescending(x => x.Order)
            .Select(x => new AppReleaseVersionQueryItem()
            {
                Id = x.Id,
                Title = x.Title,
                Version = x.Version,
                Description = x.Description,
            })
            .FirstOrDefaultAsync();

        return version;
    }

    public async Task<(List<AppRelease> releases, int total)> GetPageListAsync(
        int pageIndex,
        int pageSize,
        DataFilter? filter,
        List<DataSort> sorts,
        string keywords
    )
    {
        var queryable =
            from release in (await GetQueryableAsync()).ApplyDataFilter(filter).ApplyDataSort(sorts)
            where release.Title.Contains(keywords)
            group release by release.AppId into g
            select g.First();

        var apps = await queryable.TakePage(pageIndex, pageSize).ToListAsync();

        var total = await queryable.CountAsync();

        return (apps, total);
    }

    public async Task<AppReleaseQueryItem?> GetResultReleaseAsync(Guid appId)
    {
        var dbContext = await GetDbContextAsync();

        var query =
            from release in dbContext.Set<AppRelease>()
            where release.AppId == appId && release.OnlineTime < DateTime.Now && release.OfflineTime > DateTime.Now
            orderby release.Order descending
            select new
            {
                release.Id,
                release.AppId,
                release.Title,
                release.Favicon,
                release.Description,
                release.Content,
            };

        var item = await query.FirstOrDefaultAsync();

        return item != null
            ? new AppReleaseQueryItem
            {
                Id = item.Id,
                AppId = item.AppId,
                Title = item.Title,
                Favicon = item.Favicon,
                Description = item.Description,
                Pages = [.. jsonSerializer.Deserialize<List<AppPageQueryItem>>(item.Content)],
            }
            : null;
    }

    public async Task<int> GetMaxReleaseOrderAsync(Guid appId)
    {
        var list = (await GetQueryableAsync()).Where(x => x.AppId == appId).ToList();

        if (list == null || list.Count == 0)
        {
            return -1;
        }

        var maxOrder = list.Max(x => x.Order);

        return maxOrder;
    }

    public async Task<List<AppReleaseVersionQueryItem>> GetAllVersionsAsync(Guid appId)
    {
        var versions = (await GetQueryableAsync())
            .Where(x => x.AppId == appId)
            .OrderByDescending(x => x.Order)
            .Select(x => new AppReleaseVersionQueryItem()
            {
                Id = x.Id,
                Title = x.Title,
                Favicon = x.Favicon,
                Version = x.Version,
                Order = x.Order,
                Description = x.Description,
            });

        return [.. versions];
    }
}
