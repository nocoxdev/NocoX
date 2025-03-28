using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Common;
using Volo.Abp.Domain.Repositories;

namespace NocoX.Apps;

public interface IAppHistoryRepository : IRepository<AppHistory, Guid>
{
    Task<(List<HistoryQueryItem> histories, int total)> GetPageListAsync(
        Guid appId,
        int pageIndex,
        int pageSize,
        DataFilter? filter,
        List<DataSort> sorts,
        string keywords
    );

    Task<AppHistory?> GetLatestAynsc(Guid appId);
}
