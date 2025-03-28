using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Common.Dtos;
using NocoX.Workspaces.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace NocoX.Workspaces;

public interface IWorkspaceAppService : IApplicationService
{
    Task<DataResult<WorkspaceGetDto>> CreateAsync(CreateWorkspaceInput input);

    Task<DataResult<List<WorkspaceGetDto>>> GetListAsync();

    Task<DataResult<WorkspaceGetDto>> GetAsync(Guid id);

    Task<Result> ModifyTitleAsync(ModifyWorkspaceTitleInput input);

    Task<Result> DeleteAsync(Guid id);

    Task<Result> AddMembersAsync(ChangeWorkspaceMembersInput input);

    Task<Result> DeleteMembersAsync(ChangeWorkspaceMembersInput input);

    Task<DataResult<PagedResultDto<WorkspaceMemberGetDto>>> GetMemberPageListAsync(WorkspaceMemberGetPageListInput input);

    Task<DataResult<PagedResultDto<WorkspaceMemberGetDto>>> GetRestMemberPageListAsync(WorkspaceMemberGetPageListInput input);
}
