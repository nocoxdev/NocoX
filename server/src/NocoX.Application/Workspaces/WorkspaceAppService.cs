using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;
using NocoX.Common.Converters;
using NocoX.Common.Dtos;
using NocoX.Identity;
using NocoX.Localization;
using NocoX.Workspaces.Dtos;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Users;

namespace NocoX.Workspaces;

public class WorkspaceAppService(
    WorkspaceMananger workspaceMananger,
    IWorkspaceRepository workspaceRepository,
    IWorkspaceMemberRepository workspaceMemberRepository,
    ICurrentUser currentUser,
    IStringLocalizer<NocoXResource> localizer
) : NocoXApplicationService, IWorkspaceAppService
{
    public async Task<DataResult<WorkspaceGetDto>> CreateAsync(CreateWorkspaceInput input)
    {
        var workspace = new Workspace(input.Title);

        await workspaceRepository.InsertAsync(workspace);
        var dto = ObjectMapper.Map<Workspace, WorkspaceGetDto>(workspace);

        return DataSuccess(dto);
    }

    public async Task<Result> DeleteAsync(Guid id)
    {
        await workspaceMananger.CheckPermissionAsync(id);
        await workspaceMananger.DeleteAsync(id);

        return Success();
    }

    public async Task<DataResult<WorkspaceGetDto>> GetAsync(Guid id)
    {
        await workspaceMananger.CheckPermissionAsync(id);

        var workspace = await workspaceRepository.GetAsync(id);
        var dto = ObjectMapper.Map<Workspace, WorkspaceGetDto>(workspace);
        return DataSuccess(dto);
    }

    public async Task<DataResult<List<WorkspaceGetDto>>> GetListAsync()
    {
        var userId = currentUser.Id ?? throw new Exception(localizer["User is not exist"]);

        var workspaces = await workspaceRepository.GetListByMemberAsync(userId);

        var dtos = ObjectMapper.Map<List<Workspace>, List<WorkspaceGetDto>>(workspaces);
        return DataSuccess(dtos);
    }

    public async Task<Result> ModifyTitleAsync(ModifyWorkspaceTitleInput input)
    {
        await workspaceMananger.CheckPermissionAsync(input.Id);

        Check.NotNullOrWhiteSpace(input.Title, nameof(input.Title));

        var workspace = await workspaceRepository.GetAsync(input.Id);

        workspace.Title = input.Title;
        await workspaceRepository.UpdateAsync(workspace);
        return Success();
    }

    public async Task<Result> AddMembersAsync(ChangeWorkspaceMembersInput input)
    {
        await workspaceMananger.CheckPermissionAsync(input.Id);

        await workspaceMananger.AddUsersAsync(input.Id, input.UserIds);
        return Success();
    }

    public async Task<Result> DeleteMembersAsync(ChangeWorkspaceMembersInput input)
    {
        await workspaceMananger.CheckPermissionAsync(input.Id);

        await workspaceMananger.DeleteUsersAsync(input.Id, input.UserIds);
        return Success();
    }

    public async Task<DataResult<PagedResultDto<WorkspaceMemberGetDto>>> GetMemberPageListAsync(
        WorkspaceMemberGetPageListInput input
    )
    {
        await workspaceMananger.CheckPermissionAsync(input.Id);
        var (users, total) = await workspaceMemberRepository.GetPageListAsync(
            input.Id,
            input.RoleId ?? Guid.Empty,
            input.Filter.ToDataFilter(),
            input.Sorts.ToDataSorts(),
            input.Keywords ?? ""
        );

        var result = new PagedResultDto<WorkspaceMemberGetDto>(
            total,
            ObjectMapper.Map<List<UserQueryItem>, List<WorkspaceMemberGetDto>>(users)
        );
        return DataSuccess(result);
    }

    public async Task<DataResult<PagedResultDto<WorkspaceMemberGetDto>>> GetRestMemberPageListAsync(
        WorkspaceMemberGetPageListInput input
    )
    {
        await workspaceMananger.CheckPermissionAsync(input.Id);
        var (users, total) = await workspaceMemberRepository.GetRestPageListAsync(
            input.Id,
            input.RoleId ?? Guid.Empty,
            input.Filter.ToDataFilter(),
            input.Sorts.ToDataSorts(),
            input.Keywords ?? ""
        );

        var result = new PagedResultDto<WorkspaceMemberGetDto>(
            total,
            ObjectMapper.Map<List<UserQueryItem>, List<WorkspaceMemberGetDto>>(users)
        );
        return DataSuccess(result);
    }
}
