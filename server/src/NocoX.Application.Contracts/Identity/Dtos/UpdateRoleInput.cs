using System;

namespace NocoX.Identity.Dtos;

public class UpdateRoleInput
{
    public Guid Id { get; set; }

    public string Name { get; set; }

    public string? Description { get; set; }
}
