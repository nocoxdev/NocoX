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

namespace NocoX.Templates;

public class BlockRepository(IDbContextProvider<NocoXDbContext> dbContextProvider)
    : EfCoreRepository<NocoXDbContext, Block, Guid>(dbContextProvider),
        IBlockRepository
{
    public async Task<(List<Block> items, int total)> GetPageListAsync(
        int pageIndex,
        int pageSize,
        BlockType type,
        DataFilter? filter,
        List<DataSort> sorts,
        string keywords
    )
    {
        var queryable = await GetListQueryAsync(type, filter, sorts, keywords);

        var items = await queryable.TakePage(pageIndex, pageSize).ToListAsync();
        var total = await queryable.CountAsync();
        return (items, total);
    }

    protected async Task<IQueryable<Block>> GetListQueryAsync(
        BlockType type,
        DataFilter? filter,
        List<DataSort> sorts,
        string keywords
    )
    {
        return (await GetQueryableAsync())
            .WhereIf(type == BlockType.Public, x => x.IsPublic == true)
            .WhereIf(type == BlockType.Private, x => x.IsPublic == false)
            .WhereIf(
                !keywords.IsNullOrWhiteSpace(),
                x => x.Name.Contains(keywords) || x.Tags.Contains(keywords) || x.Description.Contains(keywords)
            )
            .ApplyDataFilter(filter)
            .ApplyDataSort(sorts);
    }
}
