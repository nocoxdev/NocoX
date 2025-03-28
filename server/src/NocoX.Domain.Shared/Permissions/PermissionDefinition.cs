using System.Collections.Generic;

namespace NocoX.Permissions;

public class PermissionGroupDefinition
{
    public PermissionGroupDefinition(string name, string description)
    {
        Name = name;
        Description = description;
    }

    public string Name { get; set; }

    public string Description { get; set; }

    public List<PermissionDefinition> Permissions { get; set; } = [];

    public void AddPermission(PermissionType type, string name, string description)
    {
        Permissions.Add(new PermissionDefinition(type, name, description));
    }
}

public class PermissionDefinition
{
    public PermissionDefinition(PermissionType type, string name, string description)
    {
        Type = type;
        Name = name;
        Description = description;
    }

    public string Name { get; set; }

    public string Description { get; set; }

    public PermissionType Type { get; set; }
}
