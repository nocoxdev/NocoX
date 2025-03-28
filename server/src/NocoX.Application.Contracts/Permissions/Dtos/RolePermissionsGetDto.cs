using System.Collections.Generic;

namespace NocoX.Permissions.Dtos;

public class RolePermissionsGetDto
{
    public List<PermissionGroupGetDto> Groups { get; set; }

    public List<string> Grants { get; set; }
}
