using NocoX.Apps.Dtos;
using NocoX.Common.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace NocoX.Apps;

public interface IAppAppService : IApplicationService
{
    Task<DataResult<AppReleaseVersionGetDto>> GetLatestVersionAsync(Guid appId);

    Task<DataResult<RunningAppGetDto>> GetPreviewAppAsync(Guid id);

    Task<DataResult<AppGetDto>> CreateAsync(CreateAppInput input);

    Task<DataResult<AppGetDto>> ChangeFaviconAsync(ChangeAppFaviconInput input);

    Task<DataResult<AppGetDto>> ModifyTitleAsync(ModifyAppTitleInput input);

    Task<DataResult<AppGetDto>> ChangeColorAsync(ChangeAppColorInput input);

    Task<Result> DeleteAsync(Guid id);

    Task<Result> ReleaseAsync(AddAppReleaseInput input);

    Task<Result> RestoreAsync(RestoreAppInput input);

    Task<DataResult<PagedResultDto<AppGetDto>>> GetPageListAsync(AppGetPageListInput input);

    Task<DataResult<AppGetDto>> GetAsync(Guid id);

    Task<Result> AddRolesAsync(ChangeAppRolesInput input);

    Task<Result> RemoveRolesAsync(ChangeAppRolesInput input);

    Task<DataResult<List<AppRoleGetDto>>> GetRolesAsync(Guid id);

    Task<DataResult<List<AppRoleGetDto>>> GetUnGrantedRolesAsync(AppGetUnGrantedRoleInput input);
}
