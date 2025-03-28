using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;
using NocoX.Apps.Dtos;
using NocoX.Common.Dtos;
using NocoX.Identity;
using NocoX.Localization;
using NocoX.Workspaces;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.EventBus.Local;
using Volo.Abp.ObjectMapping;
using Volo.Abp.Uow;
using Volo.Abp.Users;

namespace NocoX.Apps;

public class AppAppService(
    IAppRepository appRepository,
    IAppReleaseRepository releaseRepository,
    IAppRoleRepository appRoleRepository,
    IAppPageRepository pageRepository,
    WorkspaceMananger workspaceManager,
    AppManager appManager,
    IUnitOfWorkManager uowManager,
    IStringLocalizer<NocoXResource> localizer
) : NocoXApplicationService, IAppAppService
{
    public async Task<DataResult<AppGetDto>> CreateAsync(CreateAppInput input)
    {
        await workspaceManager.CheckPermissionAsync(input.WorkspaceId);
        var app = new App(GuidGenerator.Create(), input.WorkspaceId, input.Title, input.Color);
        var result = await appManager.CreateAsync(app);
        var dto = ObjectMapper.Map<AppQueryItem, AppGetDto>(result);

        return DataSuccess(dto);
    }

    public async Task<Result> DeleteAsync(Guid id)
    {
        await appManager.CheckPermissionAsync(id);
        await appRepository.DeleteAsync(id);
        return Success();
    }

    public async Task<Result> RestoreAsync(RestoreAppInput input)
    {
        await appManager.RestoreAsync(input.HistoryId);
        return Success();
    }

    public async Task<DataResult<RunningAppGetDto>> GetPreviewAppAsync(Guid id)
    {
        await appManager.CheckPermissionAsync(id);

        var app = await appRepository.GetAsync(id);

        var pages = await pageRepository.GetResultListAsync(app.Id);

        var dto = new RunningAppGetDto()
        {
            Id = app.Id,
            Title = app.Title,
            Description = app.Description,
            Favicon = app.Favicon,
            Pages = ObjectMapper.Map<List<AppPageQueryItem>, List<PageGetDto>>(pages),
        };

        return DataSuccess(dto);
    }

    public async Task<DataResult<PagedResultDto<AppGetDto>>> GetPageListAsync(
        AppGetPageListInput input
    )
    {
        await workspaceManager.CheckPermissionAsync(input.WorkspaceId);
        var (apps, total) = await appRepository.GetResultPageListAsync(
            input.WorkspaceId,
            input.PageIndex,
            input.PageSize,
            input.Sorting ?? "",
            input.Keywords ?? ""
        );
        var result = new PagedResultDto<AppGetDto>(
            total,
            ObjectMapper.Map<List<AppQueryItem>, List<AppGetDto>>(apps)
        );
        return DataSuccess(result);
    }

    public async Task<DataResult<AppGetDto>> ChangeColorAsync(ChangeAppColorInput input)
    {
        await appManager.CheckPermissionAsync(input.Id);
        using (var uow = uowManager.Begin(requiresNew: true, isTransactional: false))
        {
            Check.NotNull(input.Color, nameof(input.Color));
            var app = await appRepository.GetAsync(input.Id);
            app.SetColor(input.Color);
            await appRepository.UpdateAsync(app);
            await uow.CompleteAsync();
        }

        var entity =
            await appRepository.GetResultAsync(input.Id)
            ?? throw new Exception(localizer["App not found"]);

        return DataSuccess(ObjectMapper.Map<AppQueryItem, AppGetDto>(entity));
    }

    public async Task<DataResult<AppGetDto>> ChangeFaviconAsync(ChangeAppFaviconInput input)
    {
        await appManager.CheckPermissionAsync(input.Id);
        using (var uow = uowManager.Begin(requiresNew: true, isTransactional: false))
        {
            var app = await appRepository.GetAsync(input.Id);

            app.SetFavicon(input.Favicon ?? "");
            await appRepository.UpdateAsync(app);
            await uow.CompleteAsync();
        }

        var entity =
            await appRepository.GetResultAsync(input.Id)
            ?? throw new Exception(localizer["App not found"]);

        return DataSuccess(ObjectMapper.Map<AppQueryItem, AppGetDto>(entity));
    }

    public async Task<DataResult<AppGetDto>> ModifyTitleAsync(ModifyAppTitleInput input)
    {
        await appManager.CheckPermissionAsync(input.Id);
        using (var uow = uowManager.Begin(requiresNew: true, isTransactional: false))
        {
            Check.NotNullOrWhiteSpace(input.Title, nameof(input.Title));
            var app = await appRepository.GetAsync(input.Id);
            app.SetTitle(input.Title);
            await appRepository.UpdateAsync(app);
            await uow.CompleteAsync();
        }

        var entity =
            await appRepository.GetResultAsync(input.Id)
            ?? throw new Exception(localizer["App not found"]);

        return DataSuccess(ObjectMapper.Map<AppQueryItem, AppGetDto>(entity));
    }

    public async Task<DataResult<AppGetDto>> GetAsync(Guid id)
    {
        await appManager.CheckPermissionAsync(id);
        var app = await appRepository.GetResultAsync(id);

        Check.NotNull(app, nameof(app));

        var pages = (await pageRepository.GetResultListAsync(app.Id));

        var dto = ObjectMapper.Map<AppQueryItem, AppGetDto>(app);

        dto.Pages = ObjectMapper.Map<List<AppPageQueryItem>, List<PageGetDto>>(pages);

        return DataSuccess(dto);
    }

    public async Task<Result> AddRolesAsync(ChangeAppRolesInput input)
    {
        await appManager.CheckPermissionAsync(input.Id);
        await appManager.AddRolesAsync(input.Id, input.RoleIds);
        return Success();
    }

    public async Task<Result> RemoveRolesAsync(ChangeAppRolesInput input)
    {
        await appManager.CheckPermissionAsync(input.Id);
        await appManager.RemoveRolesAsync(input.Id, input.RoleIds);
        return Success();
    }

    public async Task<DataResult<AppReleaseVersionGetDto>> GetLatestVersionAsync(Guid appId)
    {
        var version = await releaseRepository.GetCurrentVersionAsync(appId);

        var dto = ObjectMapper.Map<AppReleaseVersionQueryItem, AppReleaseVersionGetDto>(version);

        return DataSuccess(dto);
    }

    public async Task<DataResult<List<AppRoleGetDto>>> GetRolesAsync(Guid id)
    {
        await appManager.CheckPermissionAsync(id);
        var roles = await appRoleRepository.GetListAsync(id);
        var dtos = ObjectMapper.Map<List<Role>, List<AppRoleGetDto>>(roles);
        return DataSuccess(dtos);
    }

    public async Task<DataResult<List<AppRoleGetDto>>> GetUnGrantedRolesAsync(
        AppGetUnGrantedRoleInput input
    )
    {
        await appManager.CheckPermissionAsync(input.Id);
        var roles = await appRoleRepository.GetUnGrantedListAsync(
            input.Id,
            input.Keywords ?? string.Empty
        );
        var dtos = ObjectMapper.Map<List<Role>, List<AppRoleGetDto>>(roles);
        return DataSuccess(dtos);
    }

    public async Task<Result> ReleaseAsync(AddAppReleaseInput input)
    {
        await appManager.CheckPermissionAsync(input.Id);

        await appManager.ReleaseAync(
            input.Id,
            input.Version,
            input.OnlineTime,
            input.OfflineTime ?? DateTime.MaxValue,
            input.Description ?? string.Empty
        );
        return Success();
    }
}
