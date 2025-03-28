using System;
using System.Diagnostics.CodeAnalysis;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;

namespace NocoX.Identity;

public class Role : FullAuditedEntity<Guid>
{
    public Role(Guid id, [NotNull] string name, string? description)
    {
        Check.NotNull(name, nameof(name));
        Id = id;
        Name = name;
        Description = description;
        Status = RoleStatus.Normal;
    }

    public string Name { get; set; }

    public RoleStatus Status { get; set; }

    public string? Description { get; set; }

    public void SetStatus(RoleStatus status)
    {
        Status = status;
    }
}
