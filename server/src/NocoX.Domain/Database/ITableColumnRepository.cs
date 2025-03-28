using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Common;

namespace NocoX.Database;

public interface ITableColumnRepository : ICanOrderRepository<TableColumn>
{
    Task<List<TableColumnQueryItem>> GetResultListAsync(Guid tableId);

    Task AddTableColumnAsync(Table table, TableColumn column);

    Task DropTableColumnAsync(Table table, TableColumn column);

    Task UpdateColumnAsync(Table table, TableColumn column, string oldColumnName);
}
