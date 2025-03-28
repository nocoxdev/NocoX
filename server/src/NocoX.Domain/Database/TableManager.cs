using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;
using NocoX.Common;
using NocoX.Localization;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;

namespace NocoX.Database;

public class TableManager(
    ITableRepository tableRepository,
    ITableColumnRepository columnRepository,
    IRepository<TableRelationship> relationshipRepository,
    IStringLocalizer<NocoXResource > localizer
) : DomainService
{
    public async Task CreateTableAsync(Table table)
    {
        var keyColumn = TableSystemColumns.Id;
        keyColumn.SetTableId(table.Id);

        await columnRepository.InsertManyAsync([keyColumn]);
        await tableRepository.CreateTableAsync(table, [keyColumn]);
    }

    public async Task UpdateTableAsync(Table table, string oldTableName)
    {
        await tableRepository.UpdateTableAsync(table, oldTableName);
    }

    public async Task DeleteTableAsync(Guid tableId)
    {
        var table = await tableRepository.GetAsync(tableId);

        await columnRepository.DeleteAsync(x => x.TableId == tableId);
        await relationshipRepository.DeleteAsync(x => x.RelatedTableId == tableId);
        await tableRepository.DropTableAsync(tableId);
    }

    public async Task ReorderTableAsync(Guid tableId, int toIndex)
    {
        var table = await tableRepository.GetAsync(tableId);

        await tableRepository.ReorderAsync(null, table.Id, toIndex, null);
    }

    public async Task ReorderTableColumnAsync(Guid columnId, int toIndex)
    {
        var column = await columnRepository.GetAsync(columnId);

        await columnRepository.ReorderAsync(x => x.TableId == column.TableId, column.Id, toIndex, null);
    }

    public async Task AddTableColumnAsync(TableColumn column, Guid? relatedTableId, Guid? relatedTableDisplayColumnId)
    {
        var table = await tableRepository.GetAsync(column.TableId);
        if (column.UiType == UiType.Relation)
        {
            await AddTableRelationship(column.Id, relatedTableId, relatedTableDisplayColumnId);
        }

        await columnRepository.AddTableColumnAsync(table, column);
    }

    public async Task UpdateTableColumnAsync(
        TableColumn column,
        string oldColumnName,
        Guid? relatedTableId,
        Guid? relatedTableDisplayColumnId
    )
    {
        var table = await tableRepository.GetAsync(column.TableId);
        if (column.UiType == UiType.Relation)
        {
            await relationshipRepository.DeleteAsync(x => x.ColumnId == column.Id);
            await AddTableRelationship(column.Id, relatedTableId, relatedTableDisplayColumnId);
        }

        await columnRepository.UpdateColumnAsync(table, column, oldColumnName);
    }

    public async Task DeleteTableColumnAsync(Guid columnId)
    {
        var column = await columnRepository.GetAsync(columnId);

        var table = await tableRepository.GetAsync(column.TableId);

        if (column.UiType == UiType.Relation)
        {
            await relationshipRepository.DeleteAsync(x => x.ColumnId == columnId);
        }

        await columnRepository.DropTableColumnAsync(table, column);
    }

    private async Task AddTableRelationship(Guid columnId, Guid? relatedTableId, Guid? relatedTableDisplayColumnId)
    {
        var relatedTable =
            await tableRepository.FirstOrDefaultAsync(x => x.Id == relatedTableId)
            ?? throw new Exception(localizer["Relation table not found."]);

        var relatedTableDisplayColumn =
            await columnRepository.FirstOrDefaultAsync(x =>
                x.TableId == relatedTable.Id && x.Id == relatedTableDisplayColumnId
            ) ?? throw new Exception(localizer["Relation table column not found."]);

        if (relatedTableDisplayColumn.UiType == UiType.Relation)
        {
            throw new Exception(localizer["Relation column can not be relation."]);
        }

        var relationship = new TableRelationship(
            GuidGenerator.Create(),
            columnId,
            relatedTable.Id,
            relatedTableDisplayColumn.Id
        );

        await relationshipRepository.InsertAsync(relationship);
    }
}
