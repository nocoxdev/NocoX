using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;
using NocoX.Apps.Dtos;
using NocoX.Common.Converters;
using NocoX.Common.Dtos;
using NocoX.Localization;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Users;

namespace NocoX.Apps;

public class AppReleaseAppService(
    IAppReleaseRepository releaseRepository,
    IAppRepository appRepository,
    ICurrentUser currentUser,
    IStringLocalizer<NocoXResource> localizer
) : NocoXApplicationService, IAppReleaseAppService
{
    public async Task<DataResult<AppReleaseGetDto>> GetAync(Guid id)
    {
        var release = await releaseRepository.GetAsync(id);

        return DataSuccess(ObjectMapper.Map<AppRelease, AppReleaseGetDto>(release));
    }

    public async Task<DataResult<List<MyAppGetDto>>> GetMyAppsAsync()
    {
        var currentUserId = currentUser.Id ?? throw new Exception(localizer["User is not exist"]);

        var apps = await releaseRepository.GetListByUserAsync(currentUserId);

        return DataSuccess(ObjectMapper.Map<List<AppRelease>, List<MyAppGetDto>>(apps));
    }

    public async Task<DataResult<PagedResultDto<AppReleaseGetDto>>> GetPageListAsync(QueryPageListParamsInput input)
    {
        var (releases, total) = await releaseRepository.GetPageListAsync(
            input.PageIndex,
            input.PageSize,
            input.Filter.ToDataFilter(),
            input.Sorts.ToDataSorts(),
            input.Keywords ?? ""
        );

        var result = new PagedResultDto<AppReleaseGetDto>(
            total,
            ObjectMapper.Map<List<AppRelease>, List<AppReleaseGetDto>>(releases)
        );

        return DataSuccess(result);
    }


    public async Task<DataResult<RunningAppGetDto>> GetRunningAppAsync(Guid id)
    {
        var currentUserId = currentUser.Id ?? throw new Exception(localizer["User is not exist"]);

        var apps = await appRepository.GetListByUserAsync(currentUserId);

        var release =
            (await releaseRepository.GetResultReleaseAsync(id))
            ?? throw new Exception(localizer["The app maybe not go live or offline."]);

        var exist = apps.Exists(x => x.Id == release.AppId);

        if (!exist)
        {
            throw new Exception(localizer["Denfied visit, please contact admin."]);
        }

        return DataSuccess(ObjectMapper.Map<AppReleaseQueryItem, RunningAppGetDto>(release));
    }

    public async Task<DataResult<AppReleaseInfoGetDto>> GetInfoAsync(Guid id)
    {
        var app = await releaseRepository.SingleOrDefaultAsync(x => x.Id == id);

        if (app == null)
        {
            return DataSuccess<AppReleaseInfoGetDto>(null);
        }

        var release = await releaseRepository.GetCurrentVersionAsync(id);

        var dto = new AppReleaseInfoGetDto
        {
            Id = app.Id.ToString(),
            Title = app.Title,
            Favicon = app.Favicon ?? "",
            Description = app.Description ?? "",
            CurrentVersion = release == null ? "" : release.Version,
        };

        return DataSuccess(dto);
    }

    public async Task<Result> UpdateAsync(UpdateAppReleaseInput input)
    {
        var release = await releaseRepository.GetAsync(input.Id);

        release.Title = input.Title;
        release.Favicon = input.Favicon;
        release.Description = input.Description;
        release.OnlineTime = input.OnlineTime;
        release.OfflineTime = input.OfflineTime;

        await releaseRepository.UpdateAsync(release);

        return Success();
    }

    public async Task<Result> DeleteAsync(Guid releaseId)
    {
        await releaseRepository.DeleteAsync(releaseId);
        return Success();
    }

    public async Task<Result> RollbackAsync(Guid id)
    {
        var release = await releaseRepository.GetAsync(id);

        var maxOrder = await releaseRepository.GetMaxReleaseOrderAsync(release.AppId);

        release.Order = maxOrder + 1;

        await releaseRepository.UpdateAsync(release);

        return Success();
    }

    public async Task<DataResult<List<AppReleaseVersionGetDto>>> GetAllVersionsAsync(Guid appId)
    {
        var versions = await releaseRepository.GetAllVersionsAsync(appId);
        var dtos = ObjectMapper.Map<List<AppReleaseVersionQueryItem>, List<AppReleaseVersionGetDto>>(versions);

        return DataSuccess(dtos);
    }

  
}
