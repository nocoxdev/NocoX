using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.AppDatas.Dtos;
using NocoX.Common.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace NocoX.AppDatas;

public interface IAppDataAppService : IApplicationService
{
    Task<Result> AddAsync(InsertDataInput input);

    Task<Result> UpdateAsync(UpdateDataInput input);

    Task<Result> DeleteAsync(DeleteDataInput input);

    Task<DataResult<object?>> GetByIdAsync(DataGetByIdInput input);

    Task<DataResult<object?>> GetByUserAsync(DataGetByUserInput input);

    Task<DataResult<List<object>>> GetListAsync(DataGetListInput input);

    Task<DataResult<PagedResultDto<object>>> GetPageListAsync(DataGetPageListInput input);

    Task<DataResult<int>> GetCountAsync(DataGetListInput input);
}
