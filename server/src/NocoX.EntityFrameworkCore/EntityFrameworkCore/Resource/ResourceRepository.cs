using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Layda.EntityFrameworkCore.Common;
using Microsoft.EntityFrameworkCore;
using NocoX.Common;
using NocoX.EntityFrameworkCore;
using NocoX.Identity;
using NocoX.Resource;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace NocoX.Resurce;

public class ResourceRepository(IDbContextProvider<NocoXDbContext> dbContextProvider)
    : EfCoreRepository<NocoXDbContext, ResourceDescriptor, Guid>(dbContextProvider),
        IResourceRepository
{
    public async Task<List<string>> GetExtensionsAsync()
    {
        var queryable = await GetQueryableAsync();

        return await queryable.Select(x => x.Extension).Distinct().ToListAsync();
    }

    public async Task<(List<ResourceDescriptorQueryItem> items, int total)> GetPageListAsync(
        int pageIndex,
        int pageSize,
        DataFilter? filter,
        List<DataSort> sorts,
        string keywords
    )
    {
        var dbContext = await GetDbContextAsync();

        var queryable =
            from resource in dbContext
                .Set<ResourceDescriptor>()
                .WhereIf(
                    !string.IsNullOrWhiteSpace(keywords),
                    x => x.Name.Contains(keywords) || x.Extension.Contains(keywords)
                )
                .ApplyDataFilter(filter)
                .ApplyDataSort(sorts)
            join creator in dbContext.Set<User>() on resource.CreatorId equals creator.Id
            select new ResourceDescriptorQueryItem
            {
                Id = resource.Id,
                Path = $"{resource.Id}.{resource.Extension}",
                Name = resource.Name,
                Type = resource.Type,
                Creator = creator.UserName,
                CreationTime = resource.CreationTime,
                Extension = resource.Extension,
            };

        var items = await queryable.TakePage(pageIndex, pageSize).ToListAsync();
        var total = await queryable.CountAsync();

        return (items, total);
    }
}
