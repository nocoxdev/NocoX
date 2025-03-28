using System;

namespace NocoX.Apps.Dtos;

public class ChangeAppRolesInput
{
    public Guid Id { get; set; }

    public Guid[] RoleIds { get; set; }
}
