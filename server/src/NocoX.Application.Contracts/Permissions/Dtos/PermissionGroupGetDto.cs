using System.Collections.Generic;

namespace NocoX.Permissions.Dtos;

public class PermissionGroupGetDto
{
    public string Id { get; set; }

    public string Name { get; set; }

    public List<PermissionGetDto> Permissions { get; set; }
}
