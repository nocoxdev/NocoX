using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace NocoX.Dictionary;

public interface IDictionaryDataRepository : IRepository<DictionaryData, Guid>
{
    Task<DictionaryData> GetIncludeChildrenAsync(Guid id);

    Task<List<DictionaryData>> GetChildrenAsync(Guid parentId);

    Task<(List<DictionaryData> items, int total)> GetPageListAsync(
        int pageIndex,
        int pageSize,
        Guid groupId,
        string keywords,
        bool includeChildren
    );

    Task<List<DictionaryData>> GetListAsync(Guid groupId, string keywords, bool includeChildren);
}
