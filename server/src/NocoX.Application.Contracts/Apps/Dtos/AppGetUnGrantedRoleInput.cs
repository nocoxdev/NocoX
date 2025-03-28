using System;

namespace NocoX.Apps.Dtos;

public class AppGetUnGrantedRoleInput
{
    public Guid Id { get; set; }

    public string? Keywords { get; set; }
}
