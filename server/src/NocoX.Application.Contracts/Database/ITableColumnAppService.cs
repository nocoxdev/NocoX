using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Common.Dtos;
using NocoX.Database.Dtos;
using Volo.Abp.Application.Services;

namespace NocoX.Database;

public interface ITableColumnAppService : IApplicationService
{
    Task<Result> AddTableColumnAsync(AddTableColumnInput input);

    Task<Result> DeleteTableColumnAsync(Guid id);

    Task<Result> UpdateTableColumnAsync(UpdateTableColumnInput input);

    Task<Result> ResizeTableColumnAsync(ResizeTableColumnInput input);

    Task<Result> ReorderTableColumnAsync(ReorderInput input);

    Task<Result> HideTableColumnAsync(OnlyIdsInput input);

    Task<Result> ShowTableColumnAsync(OnlyIdsInput input);

    Task<DataResult<List<TableColumnGetDto>>> GetTableColumnsAsync(Guid tableId);
}
