using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using NocoX.Common;
using NocoX.Database;
using NocoX.EntityFrameworkCore.Common;
using Volo.Abp.EntityFrameworkCore;

namespace NocoX.EntityFrameworkCore.Database;

public class TableRepository(IDbContextProvider<NocoXDbContext> dbContextProvider)
    : CanOrderRepository<NocoXDbContext, Table>(dbContextProvider),
        ITableRepository
{
    public async Task CreateTableAsync(Table table, List<TableColumn> columns)
    {
        var tableName = table.TableName;

        var context = await GetDbContextAsync();

        var pk = columns.Where(x => x.PrimaryKey).Select(x => x.ColumnName).ToArray();

        var operations = columns.Select(x => new AddColumnOperation
        {
            Table = tableName,
            Name = x.ColumnName,
            ClrType = x.UiType.GetClrType(),
            IsNullable = !x.Required,
        });

        await InsertAsync(table);

        await context.CreateTableAsync(tableName, pk, [.. operations]);
    }

    public async Task UpdateTableAsync(Table table, string oldTableName)
    {
        var context = await GetDbContextAsync();

        var operation = new RenameTableOperation
        {
            Name = oldTableName,
            NewName = table.TableName,
            IsDestructiveChange = false,
        };

        await UpdateAsync(table);

        await context.RenameTableAsync(operation);
    }

    public async Task DropTableAsync(Guid id)
    {
        var table = await GetAsync(id);
        await DeleteAsync(table.Id);

        var tableName = table.TableName;
        var operation = new DropTableOperation { Name = tableName, IsDestructiveChange = false };
        var context = await GetDbContextAsync();
        await context.DropTableAsync(tableName);
    }
}
