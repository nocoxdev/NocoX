using System;

namespace NocoX.Workspaces.Dtos;

public class ChangeWorkspaceMembersInput
{
    public Guid Id { get; set; }

    public Guid[] UserIds { get; set; }
}
