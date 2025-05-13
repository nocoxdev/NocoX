using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NocoX.AppDatas.Dtos;
using NocoX.Common;
using NocoX.Common.Dtos;
using NocoX.Dapper.AppDatas;
using NocoX.Database;
using Volo.Abp.Application.Dtos;

namespace NocoX.AppDatas;

public class AppDataAppService(
    AppDataManager dataManager,
    ITableRepository tableRepository,
    ITableColumnRepository columnRepository,
    AppDataDapperRepository dataRepository
) : NocoXApplicationService, IAppDataAppService
{
    public async Task<Result> AddAsync(InsertDataInput input)
    {
        await dataManager.InsertAsync(input.TableId, input.Data);

        return Success();
    }

    public async Task<Result> UpdateAsync(UpdateDataInput input)
    {
        await dataManager.UpdateAsync(input.TableId, input.Id, input.Data);

        return Success();
    }

    public async Task<Result> DeleteAsync(DeleteDataInput input)
    {
        await dataManager.DeleteManyAsync(input.TableId, input.Ids);
        return Success();
    }

    public async Task<DataResult<object?>> GetByIdAsync(DataGetByIdInput input)
    {
        var table = await tableRepository.GetAsync(input.TableId);

        var columnInfos = await dataManager.GetColumnInfosAsync(input.TableId);
        var data = await dataRepository.GetByIdAsync(table.TableName, input.Id, columnInfos);

        return DataSuccess(data);
    }

    public async Task<DataResult<object?>> GetByUserAsync(DataGetByUserInput input)
    {
        var table = await tableRepository.GetAsync(input.TableId);

        var columnInfos = await dataManager.GetColumnInfosAsync(input.TableId);
        var data = await dataRepository.GetByUserAsync(table.TableName, input.UserId, columnInfos);

        return DataSuccess(data);
    }

    public async Task<DataResult<List<object>>> GetListAsync(DataGetListInput input)
    {
        var table = await tableRepository.GetAsync(input.TableId);

        var columnInfos = await dataManager.GetColumnInfosAsync(table.Id);
        var columns = await columnRepository.GetListAsync(x => x.TableId == table.Id);

        var data = await dataRepository.GetListAsync(
            table.TableName,
            input.Keywords ?? "",
            ConvertFilter(columns, input.Filter),
            ConvertSorts(columns, input.Sorts),
            columnInfos
        );

        return DataSuccess(data);
    }

    public async Task<DataResult<PagedResultDto<object>>> GetPageListAsync(DataGetPageListInput input)
    {
        var table = await tableRepository.GetAsync(input.TableId);

        var columnInfos = await dataManager.GetColumnInfosAsync(table.Id);
        var columns = await columnRepository.GetListAsync(x => x.TableId == table.Id);

        var (items, total) = await dataRepository.GetPageListAsync(
            table.TableName,
            input.PageIndex,
            input.PageSize,
            input.Keywords ?? "",
            ConvertFilter(columns, input.Filter),
            ConvertSorts(columns, input.Sorts),
            columnInfos
        );

        var result = new PagedResultDto<object> { TotalCount = total, Items = items };

        return DataSuccess(result);
    }

    public async Task<DataResult<int>> GetCountAsync(DataGetListInput input)
    {
        var table = await tableRepository.GetAsync(input.TableId);

        var columnInfos = await dataManager.GetColumnInfosAsync(table.Id);
        var columns = await columnRepository.GetListAsync(x => x.TableId == table.Id);

        var total = await dataRepository.GetCountAsync(
            table.TableName,
            input.Keywords ?? "",
            ConvertFilter(columns, input.Filter),
            columnInfos
        );

        return DataSuccess(total);
    }

    private static List<DataFilter> ConvertFilters(List<TableColumn> columns, List<QueryFilterInput>? filterInputs)
    {
        if (filterInputs == null)
        {
            return [];
        }

        var filters = new List<DataFilter>();

        foreach (var input in filterInputs)
        {
            var filter = ConvertFilter(columns, input);
            filters.Add(filter);
        }

        return filters;
    }

    private static DataFilter ConvertFilter(List<TableColumn> columns, QueryFilterInput? input)
    {
        var dataFilter = new DataFilter();
        if (input == null)
        {
            return dataFilter;
        }

        var conditions = input
            .Conditions.Select(x =>
            {
                if (x.Name == null || x.Operator == null || x.Value == null)
                {
                    return null;
                }

                var column = columns.SingleOrDefault(y => y.ColumnName == x.Name);

                if (column == null)
                {
                    return null;
                }
                else
                {
                    return new DataFilterCondition
                    {
                        Name = column.ColumnName,
                        Operator = (DataFilterOperator)x.Operator,
                        ValueType = column.UiType,
                        Value = x.Value,
                    };
                }
            })
            .Where(x => x != null)
            .ToList();

        dataFilter.Conditions = conditions!;

        return dataFilter;
    }

    private static List<DataSort> ConvertSorts(List<TableColumn> columns, List<QuerySortInput>? input)
    {
        if (input == null)
        {
            return [];
        }

        var sorts = input
            .Select(x =>
            {
                if (x.Name == null || x.Order == null)
                {
                    return null;
                }

                var column = columns.SingleOrDefault(y => y.ColumnName == x.Name);

                if (column == null)
                {
                    return null;
                }
                else
                {
                    return new DataSort
                    {
                        FieldName = column.ColumnName,
                        Order = (SortOrder)x.Order,
                    };
                }
            })
            .Where(x => x != null)
            .ToList();

        return sorts!;
    }
}
