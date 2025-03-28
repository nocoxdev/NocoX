using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;
using NocoX.Apps;
using NocoX.Identity;
using NocoX.Localization;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.Users;

namespace NocoX.Workspaces;

public class WorkspaceMananger(
    IWorkspaceRepository workspaceRepository,
    IAppRepository appRepository,
    IUserRepository userRepository,
    IWorkspaceMemberRepository worspaceUserRepository,
    ICurrentUser currentUser,
        IStringLocalizer<NocoXResource> localizer
) : DomainService
{
    public async Task DeleteAsync(Guid id)
    {
        var entity = await workspaceRepository.GetAsync(id);

        var appCount = await appRepository.CountAsync(x => x.WorkspaceId == entity.Id);

        if (appCount > 0)
        {
            throw new Exception(localizer["Workspace has apps, cannot be deleted."]);
        }

        await workspaceRepository.DeleteAsync(entity);
    }

    public async Task AddUsersAsync(Guid workspaceId, Guid[] userIds)
    {
        var workspace = await workspaceRepository.GetAsync(workspaceId);

        var alreadyExistsIds = (await worspaceUserRepository.GetListAsync(x => x.WorkspaceId == workspaceId))
            .Select(x => x.UserId)
            .ToList();

        var newUserIds = (await userRepository.GetListAsync(x => userIds.Contains(x.Id))).Select(x => x.Id);

        var workspaceUsers = newUserIds
            .Where(x => !alreadyExistsIds.Contains(x))
            .Select(x => new WorkspaceMember(workspace.Id, x));

        await worspaceUserRepository.InsertManyAsync(workspaceUsers);
    }

    public async Task DeleteUsersAsync(Guid workspaceId, Guid[] userIds)
    {
        var workspaceUsers = await worspaceUserRepository.GetListAsync(x =>
            x.WorkspaceId == workspaceId && userIds.Contains(x.UserId)
        );

        await worspaceUserRepository.DeleteManyAsync(workspaceUsers);
    }

    public async Task CheckPermissionAsync(Guid workspaceId)
    {
        var currentUserId = currentUser.Id ?? throw new Exception(localizer["User is not exist"]);
        var workspaces = await workspaceRepository.GetListByMemberAsync(currentUserId);
        if (!workspaces.Exists(x => x.Id == workspaceId))
        {
            throw new Exception(localizer["You have not permission to update this workspace"]);
        }
    }
}
