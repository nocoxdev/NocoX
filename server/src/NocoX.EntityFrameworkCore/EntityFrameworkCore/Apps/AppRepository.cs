using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NocoX.Apps;
using NocoX.Identity;
using NocoX.Workspaces;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace NocoX.EntityFrameworkCore.Apps;

public class AppRepository(IDbContextProvider<NocoXDbContext> dbContextProvider)
    : EfCoreRepository<NocoXDbContext, App, Guid>(dbContextProvider),
        IAppRepository
{
    public async Task<List<App>> GetListByUserAsync(Guid userId)
    {
        var dbContext = await GetDbContextAsync();

        var queryable =
            from app in dbContext.Set<App>()
            join appRole in dbContext.Set<AppRole>() on app.Id equals appRole.AppId
            join userRole in dbContext.Set<UserRole>() on appRole.RoleId equals userRole.RoleId
            where userRole.UserId == userId
            select app;

        return [.. queryable];
    }

    public async Task<AppQueryItem> GetResultAsync(Guid id)
    {
        var app = await (await GetResultQueryableAsync()).SingleOrDefaultAsync(x => x.Id == id);

        return app ?? throw new EntityNotFoundException(typeof(App), id);
    }

    public async Task<(List<AppQueryItem> apps, int total)> GetResultPageListAsync(
        Guid workspaceId,
        int pageIndex,
        int pageSize,
        string sorting,
        string keywords
    )
    {
        var queryable = await GetResultQueryableAsync();

        var apps = await queryable
            .Where(x => x.WorkspaceId == workspaceId && x.Title.Contains(keywords))
            .OrderByDescending(x => x.LastModificationTime)
            .TakePage(pageIndex, pageSize)
            .ToListAsync();

        var total = await queryable.CountAsync();

        return (apps, total);
    }

    protected async Task<IQueryable<AppQueryItem>> GetResultQueryableAsync()
    {
        var dbContext = await GetDbContextAsync();

        var queryable =
            from app in dbContext.Set<App>()
            join modifier in dbContext.Set<User>() on app.LastModifierId equals modifier.Id into muser
            from modifier in muser.DefaultIfEmpty()
            join creator in dbContext.Set<User>() on app.CreatorId equals creator.Id
            join workspace in dbContext.Set<Workspace>() on app.WorkspaceId equals workspace.Id
            select new AppQueryItem
            {
                Id = app.Id,
                Title = app.Title,
                Color = app.Color,
                WorkspaceId = workspace.Id,
                Favicon = app.Favicon,
                CreationTime = app.CreationTime,
                Creator = creator.UserName,
                LastModificationTime = app.LastModificationTime ?? app.CreationTime,
                LastModifier = app.LastModifierId == null ? creator.UserName : modifier.UserName,
                WorkspaceTitle = workspace.Title,
            };

        return queryable;
    }
}
