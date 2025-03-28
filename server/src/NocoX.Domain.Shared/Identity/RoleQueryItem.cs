using System;

namespace NocoX.Identity;

public class RoleQueryItem
{
    public Guid Id { get; set; }

    public string Name { get; set; }

    public RoleStatus Status { get; set; }

    public string? Description { get; set; }
}
