using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;
using NocoX.Identity;
using NocoX.Localization;
using NocoX.Workspaces;
using Volo.Abp;
using Volo.Abp.Domain.Services;
using Volo.Abp.Json;
using Volo.Abp.Uow;
using Volo.Abp.Users;

namespace NocoX.Apps;

public class AppManager(
    IWorkspaceRepository workspaceRepository,
    IRoleRepository roleRepository,
    IAppRepository appRepository,
    IAppHistoryRepository historyRepository,
    IAppRoleRepository appRoleRepository,
    IAppPageRepository pageRepository,
    IAppReleaseRepository releaseRepository,
    IUnitOfWorkManager uowManager,
    ICurrentUser currentUser,
    IJsonSerializer jsonSerializer,
    IStringLocalizer<NocoXResource> localizer
) : DomainService
{
    public async Task<AppQueryItem> CreateAsync([NotNull] App app)
    {
        using (var uow = uowManager.Begin(requiresNew: true, isTransactional: false))
        {
            Check.NotNull(app, nameof(app));

            var workspace = await workspaceRepository.GetAsync(app.WorkspaceId);
            await appRepository.InsertAsync(app);

            await uow.CompleteAsync();
        }

        return await appRepository.GetResultAsync(app.Id);
    }

    public async Task AddRolesAsync(Guid appId, Guid[] roleIds)
    {
        var app = await appRepository.GetAsync(appId);

        var alreadyExistsIds = (await appRoleRepository.GetListAsync(x => x.AppId == appId))
            .Select(x => x.RoleId)
            .ToList();

        var newRoleIds = (await roleRepository.GetListAsync(x => roleIds.Contains(x.Id))).Select(x => x.Id);

        var appRoles = newRoleIds.Where(x => !alreadyExistsIds.Contains(x)).Select(x => new AppRole(app.Id, x));

        await appRoleRepository.InsertManyAsync(appRoles);
    }

    public async Task RemoveRolesAsync(Guid appId, Guid[] roleIds)
    {
        var appRoles = await appRoleRepository.GetListAsync(x => x.AppId == appId && roleIds.Contains(x.RoleId));

        await appRoleRepository.DeleteManyAsync(appRoles);
    }

    public async Task ReleaseAync(
        Guid appId,
        string version,
        DateTime onlineTime,
        DateTime offlineTime,
        string description
    )
    {
        var app = await appRepository.GetAsync(appId);

        var pages = await pageRepository.GetResultListAsync(appId);

        var content = pages
            .Select(x => new AppReleasePageItem
            {
                Id = x.Id,
                Title = x.Path,
                ParentId = x.ParentId,
                Path = x.Path,
                Content = x.Content,
                Type = x.Type,
            })
            .ToList();

        var maxReleaseOrder = await releaseRepository.GetMaxReleaseOrderAsync(appId);

        var release = new AppRelease
        {
            AppId = appId,
            Version = version,
            Content = jsonSerializer.Serialize(content),
            Description = description,
            OnlineTime = onlineTime,
            OfflineTime = offlineTime,
            Title = app.Title,
            Color = app.Color,
            Order = maxReleaseOrder + 1,
            Favicon = app.Favicon ?? string.Empty,
        };

        await releaseRepository.InsertAsync(release);
    }

    public async Task RestoreAsync(Guid historyId)
    {
        var history = await historyRepository.GetAsync(historyId);
        var app = await appRepository.GetAsync(history.AppId);

        await pageRepository.DeleteAsync(x => x.AppId == history.AppId);

        var pages = jsonSerializer
            .Deserialize<List<AppPageQueryItem>>(history.Content)
            .Select(x => new AppPage(x.AppId, x.ParentId, x.Path, x.Title, x.Type, x.Description));

        await pageRepository.InsertManyAsync(pages);
    }

    public async Task CheckPermissionAsync(Guid appId)
    {
        var currentUserId = currentUser.Id ?? throw new Exception(localizer["User is not exist"]);
        var workspaces = await workspaceRepository.GetListByMemberAsync(currentUserId);
        var wsIds = workspaces.Select(x => x.Id).ToList();

        var apps = await appRepository.GetListAsync(x => wsIds.Contains(x.WorkspaceId));

        if (!apps.Exists(x => x.Id == appId))
        {
            throw new Exception(localizer["You have not permission to visit this app"]);
        }
    }
}
