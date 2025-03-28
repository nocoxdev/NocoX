using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Common;
using Volo.Abp.Domain.Repositories;

namespace NocoX.Resource;

public interface IResourceRepository : IRepository<ResourceDescriptor, Guid>
{
    Task<(List<ResourceDescriptorQueryItem> items, int total)> GetPageListAsync(
        int pageIndex,
        int pageSize,
        DataFilter? filter,
        List<DataSort> sorts,
        string keywords
    );

    Task<List<string>> GetExtensionsAsync();
}
