using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Migrations.Operations;

namespace NocoX.EntityFrameworkCore;

public partial class NocoXDbContext : ITableDbContext
{
    public async Task CreateTableAsync(string tableName, string[] primaryKeys, List<AddColumnOperation> columns)
    {
        var operation = new CreateTableOperation
        {
            Name = tableName,
            PrimaryKey = primaryKeys.Length > 0 ? new AddPrimaryKeyOperation { Columns = primaryKeys } : null,
        };

        operation.Columns.AddRange(columns);

        await ExecuteOperation(operation);
    }

    public async Task RenameTableAsync(RenameTableOperation operation)
    {
        await ExecuteOperation(operation);
    }

    public async Task DropTableAsync(string tableName)
    {
        var operation = new DropTableOperation { Name = tableName, IsDestructiveChange = false };

        await ExecuteOperation(operation);
    }

    public async Task AddTableColumnAsync(AddColumnOperation operation)
    {
        await ExecuteOperation(operation);
    }

    public async Task AddTableColumnsAsync(AddColumnOperation operation)
    {
        await ExecuteOperation(operation);
    }

    public async Task DropTableColumnAsync(string tableName, string columnName)
    {
        var operation = new DropColumnOperation
        {
            Table = tableName,
            Name = columnName,
            IsDestructiveChange = false,
        };

        await ExecuteOperation(operation);
    }

    public async Task AlterColumnAsync(AlterColumnOperation operation)
    {
        await ExecuteOperation(operation);
    }

    public async Task RenameTableColumnAsync(RenameColumnOperation operation)
    {
        await ExecuteOperation(operation);
    }

    private async Task ExecuteOperation(MigrationOperation operation)
    {
        await ExecuteOperations([operation]);
    }

    private async Task ExecuteOperations(List<MigrationOperation> operations)
    {
        var migrationsSqlGenerator = this.GetService<IMigrationsSqlGenerator>();

        var commands = migrationsSqlGenerator.Generate(operations);

        foreach (var command in commands)
        {
            await Database.ExecuteSqlRawAsync(command.CommandText);
        }
    }
}
