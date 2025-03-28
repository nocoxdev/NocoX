using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace NocoX.Identity;

public class UserRole : CreationAuditedEntity<Guid>
{
    public UserRole(Guid userId, Guid roleId)
    {
        UserId = userId;
        RoleId = roleId;
    }

    public Guid UserId { get; set; }

    public Guid RoleId { get; set; }
}
