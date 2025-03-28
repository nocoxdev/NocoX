using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NocoX.Permissions;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace NocoX.EntityFrameworkCore.Permissions;

public class PermissionGroupRepository(IDbContextProvider<NocoXDbContext> dbContextProvider)
    : EfCoreRepository<NocoXDbContext, PermissionGroup, Guid>(dbContextProvider),
        IPermissionGroupRepository
{
    public async Task<List<PermissionGroupQueryItem>> GetResultListAsync()
    {
        var dbContext = await GetDbContextAsync();

        var queryable =
            from permissionGroup in dbContext.Set<PermissionGroup>()
            join permission in dbContext.Set<Permission>()
                on permissionGroup.Id equals permission.GroupId
                into permissions
            from permission in permissions.DefaultIfEmpty()
            group permission by permissionGroup into g
            select new { Group = g.Key, Permissions = g.Where(x => x != null) };

        var result = (await queryable.ToListAsync())
            .OrderBy(x => x.Group.Order)
            .Select(x => new PermissionGroupQueryItem
            {
                Id = x.Group.Id,
                Name = x.Group.Name,
                Permissions =
                [
                    .. x
                        .Permissions.Select(y => new PermissionQueryItem
                        {
                            Id = y.Id,
                            Name = y.Name,
                            Type = y.Type,
                            Order = y.Order,
                            Description = y.Description,
                        })
                        .OrderBy(x => x.Order),
                ],
            });

        return [.. result];
    }
}
