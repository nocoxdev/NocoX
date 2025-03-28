using System;
using System.Collections.Generic;
using NocoX.Identity.Dtos;

namespace NocoX.Workspaces.Dtos;

public class WorkspaceMemberGetDto
{
    public Guid Id { get; set; }

    public required string Avatar { get; set; }

    public required string UserName { get; set; }

    public required string Email { get; set; }

    public List<RoleGetDto> Roles { get; set; }
}
