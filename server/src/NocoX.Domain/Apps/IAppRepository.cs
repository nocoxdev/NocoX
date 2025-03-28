using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace NocoX.Apps;

public interface IAppRepository : IRepository<App, Guid>
{
    Task<(List<AppQueryItem> apps, int total)> GetResultPageListAsync(
        Guid workspaceId,
        int pageIndex,
        int pageSize,
        string sorting,
        string keywords
    );

    Task<AppQueryItem> GetResultAsync(Guid id);

    Task<List<App>> GetListByUserAsync(Guid userId);
}
