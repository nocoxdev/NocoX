namespace NocoX.Permissions.Dtos;

public class PermissionGetDto
{
    public string Id { get; set; }

    public string Name { get; set; }

    public PermissionType Type { get; set; }

    public int Order { get; set; }
}
