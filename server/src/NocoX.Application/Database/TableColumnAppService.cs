using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;
using NocoX.Common;
using NocoX.Common.Dtos;
using NocoX.Database.Dtos;
using NocoX.Localization;
using Volo.Abp.Domain.Repositories;

namespace NocoX.Database;

public class TableColumnAppService(
    ITableRepository tableRepository,
    ITableColumnRepository columnRepository,
    TableManager tableManager,
    IStringLocalizer<NocoXResource> localizer
) : NocoXApplicationService, ITableColumnAppService
{
    public async Task<Result> AddTableColumnAsync(AddTableColumnInput input)
    {
        TableColumn? column = null;

        if (input.UiType == UiType.Id)
        {
            return Fail(localizer["Id type can not be added and it is auto generated."]);
        }

        if (input.UiType.IsSystem())
        {
            var systemColumnExist = await columnRepository.FindAsync(x =>
                x.TableId == input.TableId && x.UiType == input.UiType
            );

            if (systemColumnExist != null)
            {
                return Fail(localizer["A table' system column is not repeat."]);
            }

            column = TableSystemColumns.GetSystemColumn(input.UiType);
            column.Title = input.Title;
            column.Description = input.Description ?? "";

            if (column == null)
            {
                return Fail(localizer["UiType is not exist"]);
            }
        }
        else
        {
            column = new TableColumn(
                GuidGenerator.Create(),
                input.TableId,
                input.UiType,
                input.ColumnName,
                input.Title,
                input.Description ?? "",
                false,
                false,
                input.Required,
                false,
                0,
                input.Width
            );
        }

        var columnExist = await columnRepository.FirstOrDefaultAsync(x =>
            x.TableId == column.TableId && x.ColumnName == column.ColumnName
        );

        if (columnExist != null)
        {
            return Fail(localizer["Column {0} is exist.", column.ColumnName]);
        }

        var table = await tableRepository.GetAsync(x => x.Id == input.TableId);

        var maxOrder = await columnRepository.GetMaxOrderAsync(x => x.TableId == table.Id, null);
        column.SetOrder(maxOrder + 1);
        column.SetTableId(table.Id);

        await tableManager.AddTableColumnAsync(column, input.Relation?.TableId, input.Relation?.DisplayColumnId);

        return Success();
    }

    public async Task<Result> UpdateTableColumnAsync(UpdateTableColumnInput input)
    {
        var column = await columnRepository.GetAsync(input.Id);
        var oldColumnName = column.ColumnName;

        column.UiType = input.UiType;
        column.Title = input.Title;
        column.Description = input.Description ?? "";
        column.Required = input.Required;
        column.ColumnName = input.ColumnName;
        column.System = input.UiType.IsSystem();

        var exist = await columnRepository.FirstOrDefaultAsync(x =>
            x.ColumnName == column.ColumnName && x.TableId == column.TableId && x.Id != column.Id
        );

        if (exist != null)
        {
            return Fail(localizer["Column {0} already exist.", column.ColumnName]);
        }

        await tableManager.UpdateTableColumnAsync(
            column,
            oldColumnName,
            input.Relation?.TableId,
            input.Relation?.DisplayColumnId
        );

        return Success();
    }

    public async Task<Result> DeleteTableColumnAsync(Guid id)
    {
        await tableManager.DeleteTableColumnAsync(id);
        return Success();
    }

    public async Task<DataResult<List<TableColumnGetDto>>> GetTableColumnsAsync(Guid tableId)
    {
        var list = await columnRepository.GetResultListAsync(tableId);

        return DataSuccess(ObjectMapper.Map<List<TableColumnQueryItem>, List<TableColumnGetDto>>(list));
    }

    public async Task<Result> ResizeTableColumnAsync(ResizeTableColumnInput input)
    {
        var column = await columnRepository.GetAsync(input.Id);

        column.Width = input.Width;

        await columnRepository.UpdateAsync(column);

        return Success();
    }

    public async Task<Result> ReorderTableColumnAsync(ReorderInput input)
    {
        await tableManager.ReorderTableColumnAsync(input.Id, input.ToIndex);

        return Success();
    }

    public async Task<Result> HideTableColumnAsync(OnlyIdsInput input)
    {
        var columns = await columnRepository.GetListAsync(x => input.Ids.Contains(x.Id));

        foreach (var column in columns)
        {
            column.Hidden = true;
        }

        await columnRepository.UpdateManyAsync(columns);
        return Success();
    }

    public async Task<Result> ShowTableColumnAsync(OnlyIdsInput input)
    {
        var columns = await columnRepository.GetListAsync(x => input.Ids.Contains(x.Id));

        foreach (var column in columns)
        {
            column.Hidden = false;
        }

        await columnRepository.UpdateManyAsync(columns);
        return Success();
    }
}
