using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NocoX.Apps;
using NocoX.EntityFrameworkCore.Common;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace NocoX.EntityFrameworkCore.Apps;

public class AppPageRepository(IDbContextProvider<NocoXDbContext> dbContextProvider)
    : CanOrderRepository<NocoXDbContext, AppPage>(dbContextProvider),
        IAppPageRepository
{
    public async Task<AppPageQueryItem> GetResultAsync(Guid id)
    {
        var dbContext = await GetDbContextAsync();
        var queryable =
            from page in dbContext.Set<AppPage>().Where(x => x.Id == id)
            orderby page.Order
            join content in dbContext.Set<AppPageContent>() on page.Id equals content.PageId into contents
            from content in contents.DefaultIfEmpty()
            select new AppPageQueryItem
            {
                Id = page.Id,
                ParentId = page.ParentId,
                Type = page.Type,
                Content = content.Content,
                Title = page.Title,
                Description = page.Description,
                Order = page.Order,
                Path = page.Path,
                AppId = page.AppId,
            };

        return (await queryable.SingleOrDefaultAsync()) ?? throw new Exception("Not found");
    }

    public virtual async Task<List<AppPageQueryItem>> GetResultListAsync(Guid appId)
    {
        var dbContext = await GetDbContextAsync();

        var queryable =
            from page in dbContext.Set<AppPage>().Where(x => x.AppId == appId)
            orderby page.Order
            join content in dbContext.Set<AppPageContent>() on page.Id equals content.PageId into contents
            from content in contents.DefaultIfEmpty()
            select new AppPageQueryItem
            {
                Id = page.Id,
                ParentId = page.ParentId,
                Type = page.Type,
                Content = content.Content,
                Title = page.Title,
                Description = page.Description,
                Order = page.Order,
                Path = page.Path,
                AppId = page.AppId,
            };

        return await queryable.ToListAsync();
    }
}
