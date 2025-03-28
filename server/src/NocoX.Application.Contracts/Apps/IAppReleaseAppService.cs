using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Apps.Dtos;
using NocoX.Common.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace NocoX.Apps;

public interface IAppReleaseAppService : IApplicationService
{
    Task<DataResult<List<MyAppGetDto>>> GetMyAppsAsync();

    Task<DataResult<PagedResultDto<AppReleaseGetDto>>> GetPageListAsync(QueryPageListParamsInput input);



    Task<DataResult<RunningAppGetDto>> GetRunningAppAsync(Guid id);

    Task<DataResult<AppReleaseInfoGetDto>> GetInfoAsync(Guid id);

    Task<Result> UpdateAsync(UpdateAppReleaseInput input);

    Task<DataResult<AppReleaseGetDto>> GetAync(Guid id);

    Task<Result> DeleteAsync(Guid id);

    Task<Result> RollbackAsync(Guid id);

    Task<DataResult<List<AppReleaseVersionGetDto>>> GetAllVersionsAsync(Guid appId);
    
}
