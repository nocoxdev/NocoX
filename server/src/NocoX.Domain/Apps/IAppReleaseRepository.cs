using NocoX.Common;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace NocoX.Apps;

public interface IAppReleaseRepository : IRepository<AppRelease, Guid>
{
    Task<List<AppRelease>> GetListByUserAsync(Guid userId);

    Task<(List<AppRelease> releases, int total)> GetPageListAsync(int pageIndex, int pageSize, DataFilter? filter,List<DataSort> sorts, string keywords);

    Task<AppReleaseVersionQueryItem?> GetCurrentVersionAsync(Guid appId);

    Task<List<AppReleaseVersionQueryItem>> GetAllVersionsAsync(Guid appId);

    Task<AppReleaseQueryItem?> GetResultReleaseAsync(Guid appId);

    Task<int> GetMaxReleaseOrderAsync(Guid appId);
}
