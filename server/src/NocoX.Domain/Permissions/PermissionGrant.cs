using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace NocoX.Permissions;

public class PermissionGrant : CreationAuditedEntity<Guid>
{
    public PermissionGrant(Guid roleId, Guid permissionId)
    {
        RoleId = roleId;
        PermissionId = permissionId;
    }

    public Guid RoleId { get; set; }

    public Guid PermissionId { get; set; }
}
