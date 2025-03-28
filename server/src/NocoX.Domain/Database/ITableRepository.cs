using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Common;

namespace NocoX.Database;

public interface ITableRepository : ICanOrderRepository<Table>
{
    Task CreateTableAsync(Table table, List<TableColumn> columns);

    Task UpdateTableAsync(Table table, string oldTableName);

    Task DropTableAsync(Guid id);
}
