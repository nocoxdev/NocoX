namespace NocoX.Permissions;

public static class MyAppsPermissions
{
    public const string GroupName = "My Apps";

    public const string View = "View";

    public static PermissionGroupDefinition GetPermissionDefinition()
    {
        var group = new PermissionGroupDefinition(GroupName, "");

        group.AddPermission(PermissionType.Normal, View, "");
        return group;
    }
}

public static class AccountPermissions
{
    public const string GroupName = "Account";

    public const string ChangePassword = "Change Password";
    public const string UpdateProfile = "Update Profile";

    public static PermissionGroupDefinition GetPermissionDefinition()
    {
        var group = new PermissionGroupDefinition(GroupName, "");

        group.AddPermission(PermissionType.Normal, ChangePassword, "");
        group.AddPermission(PermissionType.Normal, UpdateProfile, "");
        return group;
    }
}

public static class ResourcePermissions
{
    public const string GroupName = "Resource";

    public const string View = "View";
    public const string Upload = "Upload";
    public const string Delete = "Delete";

    public static PermissionGroupDefinition GetPermissionDefinition()
    {
        var group = new PermissionGroupDefinition(GroupName, "");

        group.AddPermission(PermissionType.Normal, View, "");
        group.AddPermission(PermissionType.Normal, Upload, "");
        group.AddPermission(PermissionType.Danger, Delete, "");
        return group;
    }
}

public static class WorkspacePermissions
{
    public const string GroupName = "Workspace";

    public const string View = "View";
    public const string Create = "Create";
    public const string Update = "Update";
    public const string Delete = "Delete";

    public static PermissionGroupDefinition GetPermissionDefinition()
    {
        var group = new PermissionGroupDefinition(GroupName, "");

        group.AddPermission(PermissionType.Normal, View, "");
        group.AddPermission(PermissionType.Normal, Create, "");
        group.AddPermission(PermissionType.Normal, Update, "");
        group.AddPermission(PermissionType.Danger, Delete, "");

        return group;
    }
}

public static class SettingRolePermissions
{
    public const string GroupName = "Roles";

    public const string View = "View";
    public const string Create = "Create";
    public const string Update = "Update";
    public const string Delete = "Delete";
    public const string Permissions = "Permissions";

    public static PermissionGroupDefinition GetPermissionDefinition()
    {
        var group = new PermissionGroupDefinition(GroupName, "");

        group.AddPermission(PermissionType.Normal, View, "");
        group.AddPermission(PermissionType.Normal, Create, "");
        group.AddPermission(PermissionType.Normal, Update, "");
        group.AddPermission(PermissionType.Normal, Permissions, "");
        group.AddPermission(PermissionType.Danger, Delete, "");

        return group;
    }
}

public static class SettingUserPermissions
{
    public const string GroupName = "Users";

    public const string View = "View";
    public const string Create = "Create";
    public const string Update = "Update";
    public const string Delete = "Delete";
    public const string Freeze = "Freeze";

    public static PermissionGroupDefinition GetPermissionDefinition()
    {
        var group = new PermissionGroupDefinition(GroupName, "");

        group.AddPermission(PermissionType.Normal, View, "");
        group.AddPermission(PermissionType.Normal, Create, "");
        group.AddPermission(PermissionType.Normal, Update, "");
        group.AddPermission(PermissionType.Warning, Freeze, "");
        group.AddPermission(PermissionType.Danger, Delete, "");
        return group;
    }
}

public static class ReleaseAppPermissions
{
    public const string GroupName = "Releases";

    public const string View = "View";
    public const string Update = "Update";
    public const string Delete = "Delete";
    public const string Rollback = "Rollback";

    public static PermissionGroupDefinition GetPermissionDefinition()
    {
        var group = new PermissionGroupDefinition(GroupName, "");

        group.AddPermission(PermissionType.Normal, View, "");
        group.AddPermission(PermissionType.Normal, Update, "");
        group.AddPermission(PermissionType.Warning, Rollback, "");
        group.AddPermission(PermissionType.Danger, Delete, "");

        return group;
    }
}

public static class DatabasePermissions
{
    public const string GroupName = "Database";

    public const string View = "View";
    public const string Create = "Create";
    public const string Update = "Update";
    public const string Delete = "Delete";

    public const string ViewColumn = "View";
    public const string CreateColumn = "Create Column";
    public const string UpdateColumn = "Update Column";
    public const string DeleteColumn = "Delete Column";

    public static PermissionGroupDefinition GetPermissionDefinition()
    {
        var group = new PermissionGroupDefinition(GroupName, "");

        group.AddPermission(PermissionType.Normal, View, "");
        group.AddPermission(PermissionType.Normal, Create, "");
        group.AddPermission(PermissionType.Normal, Update, "");
        group.AddPermission(PermissionType.Danger, Delete, "");
        group.AddPermission(PermissionType.Normal, ViewColumn, "");
        group.AddPermission(PermissionType.Normal, CreateColumn, "");
        group.AddPermission(PermissionType.Normal, UpdateColumn, "");
        group.AddPermission(PermissionType.Danger, DeleteColumn, "");

        return group;
    }
}

public static class DictionaryPermissions
{
    public const string GroupName = "Dictionary";

    public const string View = "View";
    public const string Create = "Create";
    public const string Update = "Update";
    public const string Delete = "Delete";

    public static PermissionGroupDefinition GetPermissionDefinition()
    {
        var group = new PermissionGroupDefinition(GroupName, "");

        group.AddPermission(PermissionType.Normal, View, "");
        group.AddPermission(PermissionType.Normal, Create, "");
        group.AddPermission(PermissionType.Normal, Update, "");
        group.AddPermission(PermissionType.Danger, Delete, "");

        return group;
    }
}
