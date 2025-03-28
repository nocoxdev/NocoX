using System;
using Volo.Abp.Domain.Entities;

namespace NocoX.Permissions;

public class Permission : Entity<Guid>
{
    public Permission(Guid id, Guid groupId, string name, string description, int order, PermissionType type)
    {
        Id = id;
        GroupId = groupId;
        Name = name;
        Order = order;
        Type = type;
        Description = description;
    }

    public Guid GroupId { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public int Order { get; set; }

    public PermissionType Type { get; set; }
}
