using System;

namespace NocoX.Permissions;

[AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
public class PermissionGroupAttribute : Attribute
{
    public string? GroupName { get; set; }

    public PermissionGroupAttribute(string groupName)
    {
        GroupName = groupName;
    }
}

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
public class PermissionAttribute : Attribute
{
    public string? GroupName { get; set; }

    public string PermissionName { get; set; }

    public PermissionAttribute(string permissionName)
    {
        PermissionName = permissionName;
    }


    public PermissionAttribute(string groupName, string permissionName)
    {
        GroupName = groupName;
        PermissionName = permissionName;
    }
}
