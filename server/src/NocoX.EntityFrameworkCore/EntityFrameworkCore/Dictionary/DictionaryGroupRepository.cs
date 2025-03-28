using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NocoX.Dictionary;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace NocoX.EntityFrameworkCore.Dictionary;

public class DictionaryGroupRepository(IDbContextProvider<NocoXDbContext> dbContextProvider)
    : EfCoreRepository<NocoXDbContext, DictionaryGroup, Guid>(dbContextProvider),
        IDictionaryGroupRepository
{
    public async Task<(List<DictionaryGroup> items, int total)> GetPageListAsync(
        int pageIndex,
        int pageSize,
        string keywords
    )
    {
        var queryable = (await GetQueryableAsync()).WhereIf(
            string.IsNullOrWhiteSpace(keywords),
            x => x.Title.Contains(keywords)
        );

        var items = await queryable.TakePage(pageIndex, pageSize).ToListAsync();
        var total = await queryable.CountAsync();

        return (items, total);
    }
}
