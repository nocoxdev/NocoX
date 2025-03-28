using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NocoX.Common.Dtos;
using NocoX.Workspaces.Dtos;
using Volo.Abp.Application.Dtos;

namespace NocoX.Workspaces;

[ApiController]
[Authorize]
[Route("api/workspace")]
public class WorkspaceController(IWorkspaceAppService workspaceAppservice) : NocoXController
{
    [HttpPost]
    [Route("create")]
    public Task<DataResult<WorkspaceGetDto>> Create([FromBody] CreateWorkspaceInput input)
    {
        return workspaceAppservice.CreateAsync(input);
    }

    [HttpPost]
    [Route("modifyTitle")]
    public Task<Result> ModifyTitle([FromBody] ModifyWorkspaceTitleInput input)
    {
        return workspaceAppservice.ModifyTitleAsync(input);
    }

    [HttpGet]
    [Route("getList")]
    public Task<DataResult<List<WorkspaceGetDto>>> GetList()
    {
        return workspaceAppservice.GetListAsync();
    }

    [HttpGet]
    [Route("get")]
    public Task<DataResult<WorkspaceGetDto>> Get(Guid id)
    {
        return workspaceAppservice.GetAsync(id);
    }

    [HttpPost]
    [Route("delete")]
    public Task<Result> Delete([FromBody] OnlyIdInput input)
    {
        return workspaceAppservice.DeleteAsync(input.Id);
    }

    [HttpPost]
    [Route("addMembers")]
    public Task<Result> AddMembers([FromBody] ChangeWorkspaceMembersInput input)
    {
        return workspaceAppservice.AddMembersAsync(input);
    }

    [HttpPost]
    [Route("deleteMembers")]
    public Task<Result> DeleteMembers([FromBody] ChangeWorkspaceMembersInput input)
    {
        return workspaceAppservice.DeleteMembersAsync(input);
    }

    [HttpPost]
    [Route("getMemberPageList")]
    public Task<DataResult<PagedResultDto<WorkspaceMemberGetDto>>> GetMembers([FromBody]WorkspaceMemberGetPageListInput input)
    {
        return workspaceAppservice.GetMemberPageListAsync(input);
    }

    [HttpPost]
    [Route("getRestMemberPageList")]
    public Task<DataResult<PagedResultDto<WorkspaceMemberGetDto>>> GetRestMembers([FromBody] WorkspaceMemberGetPageListInput input)
    {
        return workspaceAppservice.GetRestMemberPageListAsync(input);
    }
}
