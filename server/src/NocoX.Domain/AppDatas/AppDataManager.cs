using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;
using NocoX.Database;
using NocoX.Localization;
using Volo.Abp.Domain.Services;

namespace NocoX.AppDatas;

public class AppDataManager(
    IAppDataRepository dataRepository,
    ITableRepository tableRepository,
    ITableColumnRepository columnRepository,
    IStringLocalizer<NocoXResource> localizer
) : DomainService
{
    public async Task InsertAsync(Guid tableId, Dictionary<string, object?> data)
    {
        data.Add(TableSystemColumns.Id.ColumnName, GuidGenerator.Create());

        var table = await tableRepository.GetAsync(tableId);
        var columnInfos = await GetColumnInfosAsync(table.Id);

        CheckColumnNameExist(columnInfos, data);

        await dataRepository.InsertAsync(table.TableName, data, columnInfos);
    }

    public async Task UpdateAsync(Guid tableId, Guid id, Dictionary<string, object?> data)
    {
        var table = await tableRepository.GetAsync(tableId);
        var columnInfos = await GetColumnInfosAsync(table.Id);

        CheckColumnNameExist(columnInfos, data);

        await dataRepository.UpdateAsync(table.TableName, id, data, columnInfos);
    }

    public async Task DeleteAsync(Guid tableId, Guid id)
    {
        var table = await tableRepository.GetAsync(tableId);
        var columnInfos = await GetColumnInfosAsync(table.Id);
        await dataRepository.DeleteAysnc(table.TableName, id, columnInfos);
    }

    public async Task DeleteManyAsync(Guid tableId, List<Guid> ids)
    {
        var table = await tableRepository.GetAsync(tableId);

        var columnInfos = await GetColumnInfosAsync(table.Id);

        foreach (var id in ids)
        {
            await dataRepository.DeleteAysnc(table.TableName, id, columnInfos);
        }
    }

    public async Task<List<ColumnInfo>> GetColumnInfosAsync(Guid tableId)
    {
        return (await columnRepository.GetResultListAsync(tableId))
            .Select(x => new ColumnInfo
            {
                Name = x.ColumnName,
                UiType = x.UiType,
                Relation = x.Relation,
            })
            .ToList();
    }

    private  void CheckColumnNameExist(List<ColumnInfo> columns, Dictionary<string, object?> data)
    {
        foreach (var key in data.Keys)
        {
            // 检查数据中的key是否在columns的ColumnName中存在
            bool exist = columns.Any(c => c.Name.Equals(key, StringComparison.OrdinalIgnoreCase));

            if (!exist)
            {
                throw new Exception(localizer["Column name '{0}' does not exist in the table.", key]);
            }
        }
    }
}
