using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Volo.Abp.EntityFrameworkCore;

namespace NocoX;

public interface ITableDbContext : IEfCoreDbContext
{
    Task CreateTableAsync(string tableName, string[] primaryKeys, List<AddColumnOperation> columns);

    Task RenameTableAsync(RenameTableOperation operation);

    Task DropTableAsync(string tableName);

    Task AddTableColumnAsync(AddColumnOperation operation);

    Task AddTableColumnsAsync(AddColumnOperation operation);

    Task DropTableColumnAsync(string tableName, string columnName);

    Task AlterColumnAsync(AlterColumnOperation operation);

    Task RenameTableColumnAsync(RenameColumnOperation operation);
}
