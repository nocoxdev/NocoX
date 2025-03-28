using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NocoX.Common.Dtos;
using NocoX.Database.Dtos;
using NocoX.Permissions;

namespace NocoX.Database;

[ApiController]
[Authorize]
[Route("api/database")]
[PermissionGroup(DatabasePermissions.GroupName)]
public class DatabaseController(ITableAppService tableAppService, ITableColumnAppService columnAppService)
    : NocoXController
{
    [HttpGet]
    [Route("getTables")]
    [Permission(DatabasePermissions.View)]
    public Task<DataResult<List<TableGetDto>>> GetTableList(Guid appId)
    {
        return tableAppService.GetTableListAsync(appId);
    }

    [HttpGet]
    [Route("getTableColumns")]
    [Permission(DatabasePermissions.View)]
    public Task<DataResult<List<TableColumnGetDto>>> GetTableColumnsAsync(Guid tableId)
    {
        return columnAppService.GetTableColumnsAsync(tableId);
    }

    [HttpPost]
    [Route("createTable")]
    [Permission(DatabasePermissions.Create)]
    public Task<Result> CreateTable([FromBody] CreateTableInput input)
    {
        return tableAppService.CreateTableAsync(input);
    }

    [HttpPost]
    [Route("updateTable")]
    [Permission(DatabasePermissions.Update)]
    public Task<Result> UpdateTable([FromBody] UpdateTableInput input)
    {
        return tableAppService.UpdateTableAsync(input);
    }

    [HttpPost]
    [Route("deleteTable")]
    [Permission(DatabasePermissions.Delete)]
    public Task<Result> DeleteTableAsync([FromBody] OnlyIdInput input)
    {
        return tableAppService.DeleteTableAsync(input.Id);
    }

    [HttpPost]
    [Route("reorderTable")]
    [Permission(DatabasePermissions.Update)]
    public Task<Result> ReorderTableAsync([FromBody] ReorderInput input)
    {
        return tableAppService.ReorderTableAsync(input);
    }

    [HttpPost]
    [Route("addTableColumn")]
    [Permission(DatabasePermissions.CreateColumn)]
    public Task<Result> AddTableColumnAsync([FromBody] AddTableColumnInput input)
    {
        return columnAppService.AddTableColumnAsync(input);
    }

    [HttpPost]
    [Route("deleteTableColumn")]
    [Permission(DatabasePermissions.DeleteColumn)]
    public Task<Result> DeleteTableColumnAsync([FromBody] OnlyIdInput input)
    {
        return columnAppService.DeleteTableColumnAsync(input.Id);
    }

    [HttpPost]
    [Route("updateTableColumn")]
    [Permission(DatabasePermissions.UpdateColumn)]
    public Task<Result> UpdateTableColumnAsync([FromBody] UpdateTableColumnInput input)
    {
        return columnAppService.UpdateTableColumnAsync(input);
    }

    [HttpPost]
    [Route("resizeTableColumn")]
    [Permission(DatabasePermissions.UpdateColumn)]
    public Task<Result> ResizeTableColumnAsync([FromBody] ResizeTableColumnInput input)
    {
        return columnAppService.ResizeTableColumnAsync(input);
    }

    [HttpPost]
    [Route("reorderTableColumn")]
    [Permission(DatabasePermissions.UpdateColumn)]
    public Task<Result> ReorderTableColumnAsync([FromBody] ReorderInput input)
    {
        return columnAppService.ReorderTableColumnAsync(input);
    }

    [HttpPost]
    [Route("hideTableColumn")]
    [Permission(DatabasePermissions.UpdateColumn)]
    public Task<Result> HideTableColumn([FromBody] OnlyIdsInput input)
    {
        return columnAppService.HideTableColumnAsync(input);
    }

    [HttpPost]
    [Route("showTableColumn")]
    [Permission(DatabasePermissions.UpdateColumn)]
    public Task<Result> ShowTableColumn([FromBody] OnlyIdsInput input)
    {
        return columnAppService.ShowTableColumnAsync(input);
    }
}
