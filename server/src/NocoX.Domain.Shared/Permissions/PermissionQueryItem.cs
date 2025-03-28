using System;

namespace NocoX.Permissions;

public class PermissionQueryItem
{
    public Guid Id { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public PermissionType Type { get; set; }

    public int Order { get; set; }
}
