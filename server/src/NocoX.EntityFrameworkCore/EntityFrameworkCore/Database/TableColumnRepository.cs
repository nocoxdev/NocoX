using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using NocoX.Common;
using NocoX.Database;
using NocoX.EntityFrameworkCore.Common;
using Volo.Abp.EntityFrameworkCore;

namespace NocoX.EntityFrameworkCore.Database;

public class TableColumnRepository(IDbContextProvider<NocoXDbContext> dbContextProvider)
    : CanOrderRepository<NocoXDbContext, TableColumn>(dbContextProvider),
        ITableColumnRepository
{
    public async Task<List<TableColumnQueryItem>> GetResultListAsync(Guid tableId)
    {
        var dbContext = await GetDbContextAsync();

        var queryable =
            from column in dbContext.Set<TableColumn>()
            where column.TableId == tableId

            join relationship in dbContext.Set<TableRelationship>() on column.Id equals relationship.ColumnId into rs
            from relationship in rs.DefaultIfEmpty()

            join relatedTable in dbContext.Set<Table>() on relationship.RelatedTableId equals relatedTable.Id into rt
            from relatedTable in rt.DefaultIfEmpty()

            join displayColumn in dbContext.Set<TableColumn>()
                on relationship.RelatedTableDisplayColumnId equals displayColumn.Id
                into df
            from displayColumn in df.DefaultIfEmpty()

            select new TableColumnQueryItem
            {
                Id = column.Id,
                TableId = column.TableId,
                ColumnName = column.ColumnName,
                Title = column.Title,
                Description = column.Description,
                Required = column.Required,
                System = column.System,
                PrimaryKey = column.PrimaryKey,
                Order = column.Order,
                Width = column.Width,
                Hidden = column.Hidden,
                UiType = column.UiType,

                Relation = new TableRelationQueryItem
                {
                    TableId = relationship.RelatedTableId,
                    DisplayColumnId = relationship.RelatedTableDisplayColumnId,
                    TableName = relatedTable.TableName,
                    DisplayColumnName = displayColumn.ColumnName,
                },
            };

        return await queryable.ToListAsync();
    }

    public async Task AddTableColumnAsync(Table table, TableColumn column)
    {
        await InsertAsync(column);

        var context = await GetDbContextAsync();

        var operation = new AddColumnOperation
        {
            Table = table.TableName,
            Name = column.ColumnName,
            ClrType = column.UiType.GetClrType(),
            IsNullable = !column.Required,
        };

        await context.AddTableColumnAsync(operation);
    }

    public async Task DropTableColumnAsync(Table table, TableColumn column)
    {
        await DeleteAsync(column.Id);

        var columns = await GetListAsync(x => x.Order > column.Order && x.TableId == column.TableId);

        columns.ForEach(x => x.Order--);
        await UpdateManyAsync(columns);

        var context = await GetDbContextAsync();

        await context.DropTableColumnAsync(table.TableName, column.ColumnName);
    }

    public async Task UpdateColumnAsync(Table table, TableColumn column, string oldColumnName)
    {
        await UpdateAsync(column);

        var context = await GetDbContextAsync();

        var alterOperation = new AlterColumnOperation
        {
            Table = table.TableName,
            Name = column.ColumnName,
            ClrType = column.UiType.GetClrType(),
            IsNullable = !column.Required,
        };

        if (!column.UiType.IsSystem())
        {
            var renameOperation = new RenameColumnOperation
            {
                Table = table.TableName,
                Name = oldColumnName,
                NewName = column.ColumnName,
            };
            await context.RenameTableColumnAsync(renameOperation);
        }

        await context.AlterColumnAsync(alterOperation);
    }
}
