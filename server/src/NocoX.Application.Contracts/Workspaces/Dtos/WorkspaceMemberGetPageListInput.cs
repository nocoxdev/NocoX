using System;
using NocoX.Common.Dtos;

namespace NocoX.Workspaces.Dtos;

public class WorkspaceMemberGetPageListInput : QueryPageListParamsInput
{
    public Guid Id { get; set; }

    public Guid? RoleId { get; set; }
}
