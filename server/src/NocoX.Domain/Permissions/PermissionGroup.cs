using System;
using Volo.Abp.Domain.Entities;

namespace NocoX.Permissions;

public class PermissionGroup : Entity<Guid>
{
    public PermissionGroup(Guid id, string name, int order)
    {
        Id = id;
        Name = name;
        Order = order;
    }

    public string Name { get; set; }

    public int Order { get; set; }
}
