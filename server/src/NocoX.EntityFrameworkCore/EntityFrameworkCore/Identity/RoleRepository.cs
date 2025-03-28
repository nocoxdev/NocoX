using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Layda.EntityFrameworkCore.Common;
using Microsoft.EntityFrameworkCore;
using NocoX.Common;
using NocoX.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace NocoX.Identity;

public class RoleRepository(IDbContextProvider<NocoXDbContext> dbContextProvider)
    : EfCoreRepository<NocoXDbContext, Role, Guid>(dbContextProvider),
        IRoleRepository
{
    public async Task<List<Role>> GetNormalListAsync()
    {
        var roles = await (await GetQueryableAsync()).Where(x => x.Status == RoleStatus.Normal).ToListAsync();

        return roles;
    }

    public async Task<(List<Role> roles, int total)> GetPageListAsync(
        int pageIndex,
        int pageSize,
        DataFilter? filter,
        List<DataSort> sorts,
        string keywords
    )
    {
        var queryable = (await GetQueryableAsync()).WhereIf(
            !string.IsNullOrWhiteSpace(keywords),
            x => x.Name.Contains(keywords)
        );

        var roles = await queryable
            .ApplyDataFilter(filter)
            .ApplyDataSort(sorts)
            .TakePage(pageIndex, pageSize)
            .ToListAsync();

        var total = await queryable.CountAsync();

        return (roles, total);
    }
}
