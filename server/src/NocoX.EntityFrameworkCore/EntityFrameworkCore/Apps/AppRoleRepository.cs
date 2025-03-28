using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using NocoX.Apps;
using NocoX.Identity;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace NocoX.EntityFrameworkCore.Apps;

public class AppRoleRepository(IDbContextProvider<NocoXDbContext> dbContextProvider)
    : EfCoreRepository<NocoXDbContext, AppRole, Guid>(dbContextProvider),
        IAppRoleRepository
{
    public async Task<List<Role>> GetListAsync(Guid appId)
    {
        var dbContext = await GetDbContextAsync();
        var queryable =
            from role in dbContext.Set<Role>()
            join appRole in dbContext.Set<AppRole>() on role.Id equals appRole.RoleId
            where appRole.AppId == appId
            select role;

        return [.. queryable];
    }

    public async Task<List<Role>> GetUnGrantedListAsync(Guid appId, string keywords)
    {
        var dbContext = await GetDbContextAsync();

        var queryable =
            from role in dbContext.Set<Role>()
            join appRole in dbContext.Set<AppRole>() on role.Id equals appRole.RoleId into appRoleGroup
            from appRole in appRoleGroup.DefaultIfEmpty()
            where role.Name.Contains(keywords) && appRole == null
            select role;

        return [.. queryable];
    }
}
