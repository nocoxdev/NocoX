using System;

namespace NocoX.Permissions.Dtos;

public class SetRolePermissionsInput
{
    public Guid Id { get; set; }

    public Guid[] Permissions { get; set; }
}
