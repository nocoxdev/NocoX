using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Common;
using NocoX.Database;

namespace NocoX.AppDatas;

public interface IAppDataRepository
{
    Task InsertAsync(string tableName, Dictionary<string, object?> data, List<ColumnInfo> columns);
    Task UpdateAsync(string tableName, Guid id, Dictionary<string, object?> data, List<ColumnInfo> columns);

    Task DeleteAysnc(string tableName, Guid id, List<ColumnInfo> columns);

    Task<List<object>> GetListAsync(
        string tableName,
        string keywords,
        DataFilter? filterInfos,
        List<DataSort>? sorts,
        List<ColumnInfo> columns
    );

    Task<(List<object> items, int total)> GetPageListAsync(
        string tableName,
        int pageIndex,
        int pageSize,
        string keywords,
        DataFilter? filterInfos,
        List<DataSort>? sorts,
        List<ColumnInfo> columns
    );

    Task<object?> GetByIdAsync(string tableName, Guid id, List<ColumnInfo> columns);

    Task<object?> GetByUserAsync(string tableName, Guid userId, List<ColumnInfo> columns);

    Task<int> GetCountAsync(string tableName, string keywords, DataFilter? filterInfos, List<ColumnInfo> columns);
}
