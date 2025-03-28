using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace NocoX.Apps;

public class AppRole : CreationAuditedEntity<Guid>
{
    public AppRole(Guid appId, Guid roleId)
    {
        AppId = appId;
        RoleId = roleId;
    }

    public Guid AppId { get; set; }

    public Guid RoleId { get; set; }
}
