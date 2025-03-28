using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Common;

namespace NocoX.Apps;

public interface IAppPageRepository : ICanOrderRepository<AppPage>
{
    Task<List<AppPageQueryItem>> GetResultListAsync(Guid appId);

    Task<AppPageQueryItem> GetResultAsync(Guid id);
}
