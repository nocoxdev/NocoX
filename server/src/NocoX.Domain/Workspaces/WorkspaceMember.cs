using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace NocoX.Workspaces;

public class WorkspaceMember : FullAuditedEntity<Guid>
{
    public WorkspaceMember(Guid workspaceId, Guid userId)
    {
        WorkspaceId = workspaceId;
        UserId = userId;
    }

    public Guid WorkspaceId { get; set; }

    public Guid UserId { get; set; }
}
