using NocoX.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace NocoX.AppDatas;

public interface IAppDataRecordRepository : IRepository<AppDataRecord, Guid>
{
    Task<AppDataRecordQueryItem> GetResultAsync(Guid tableId, Guid formId, Guid userId);

    Task<List<AppDataRecordQueryItem>> GetResultListAsync(
        Guid tableId,
        string keywords,
        List<DataFilter> filterInfos,
        List<DataSort> sorts
    );

    Task<(List<AppDataRecordQueryItem> items, int total)> GetResultPageListAsync(
        int pageIndex,
        int pageSize,
        Guid tableId,
        string keywords,
        List<DataFilter> filterInfos,
        List<DataSort> sorts
    );

    Task<int> GetDataCount(Guid tableId, string keywords, List<DataFilter> filterInfos);

    Task<IQueryable<AppDataRecordQueryItem>> GetResultQueryable();
}
