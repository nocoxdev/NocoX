using System;
using System.Collections.Generic;

namespace NocoX.Permissions;

public class PermissionGroupQueryItem
{
    public Guid Id { get; set; }

    public string Name { get; set; }

    public List<PermissionQueryItem> Permissions { get; set; }
}
