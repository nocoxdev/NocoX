using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Common;
using Volo.Abp.Domain.Repositories;

namespace NocoX.Templates;

public interface IBlockRepository : IRepository<Block, Guid>
{
    Task<(List<Block> items, int total)> GetPageListAsync(
        int pageIndex,
        int pageSize,
        BlockType type,
        DataFilter? filter,
        List<DataSort> sorts,
        string keywords
    );
}
