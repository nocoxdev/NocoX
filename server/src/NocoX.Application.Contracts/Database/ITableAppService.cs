using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Common.Dtos;
using NocoX.Database.Dtos;
using Volo.Abp.Application.Services;

namespace NocoX.Database;

public interface ITableAppService : IApplicationService
{
    Task<Result> CreateTableAsync(CreateTableInput input);

    Task<Result> UpdateTableAsync(UpdateTableInput input);

    Task<Result> ReorderTableAsync(ReorderInput input);

    Task<Result> DeleteTableAsync(Guid tableId);

    Task<DataResult<TableGetDto>> GetTableAsync(Guid tableId);

    Task<DataResult<List<TableGetDto>>> GetTableListAsync(Guid appId);
}
