using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;
using NocoX.Apps;
using NocoX.Common.Dtos;
using NocoX.Database.Dtos;
using NocoX.Localization;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Users;

namespace NocoX.Database;

public class TableAppService(
    ITableRepository tableRepository,
    TableManager tableManager,
    ICurrentUser currentUser,
    IStringLocalizer<NocoXResource> localizer
) : NocoXApplicationService, ITableAppService
{
    public async Task<Result> CreateTableAsync(CreateTableInput input)
    {
        var exist = await tableRepository.FirstOrDefaultAsync(x => x.TableName == input.Title);

        if (exist != null)
        {
            return Fail(localizer["Table already table."]);
        }

        int maxOrder = await tableRepository.GetMaxOrderAsync(null, null);

        var table = new Table(GuidGenerator.Create(), input.Title, maxOrder + 1, input.Description ?? "");

        await tableManager.CreateTableAsync(table);

        return Success();
    }

    public async Task<Result> UpdateTableAsync(UpdateTableInput input)
    {
        var table = await tableRepository.GetAsync(input.Id);

        var currentUserId = currentUser.Id ?? throw new Exception(localizer["User is not exist"]);

        var exist = await tableRepository.FirstOrDefaultAsync(x => x.TableName == table.TableName && x.Id != table.Id);

        if (exist != null)
        {
            return Fail(localizer["Table already table."]);
        }

        var oldTableName = table.TableName;

        table.Title = input.Title;
        table.Description = input.Description ?? "";
        table.TableName = table.GetTableName();

        await tableRepository.UpdateTableAsync(table, oldTableName);

        return Success();
    }

    public async Task<Result> DeleteTableAsync(Guid tableId)
    {
        await tableManager.DeleteTableAsync(tableId);

        return Success();
    }

    public async Task<DataResult<List<TableGetDto>>> GetTableListAsync(Guid appId)
    {
        var list = (await tableRepository.GetListAsync()).OrderBy(x => x.Order).ToList();

        return DataSuccess(ObjectMapper.Map<List<Table>, List<TableGetDto>>(list));
    }

    public async Task<Result> ReorderTableAsync(ReorderInput input)
    {
        var table = await tableRepository.GetAsync(input.Id);

        await tableManager.ReorderTableAsync(input.Id, input.ToIndex);

        return Success();
    }

    public async Task<DataResult<TableGetDto>> GetTableAsync(Guid tableId)
    {
        var table = await tableRepository.GetAsync(tableId);

        return DataSuccess(ObjectMapper.Map<Table, TableGetDto>(table));
    }
}
