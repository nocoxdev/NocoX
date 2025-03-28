using System;
using NocoX.Identity;
using Volo.Abp.Domain.Entities.Auditing;

namespace NocoX.Apps;

public class AppHistory : FullAuditedEntityWithUser<Guid, User>
{
    public AppHistory(Guid appId, string comment, string content)
    {
        AppId = appId;
        Comment = comment;
        Content = content;
    }

    public Guid AppId { get; set; }

    public string Comment { get; set; }

    public string Content { get; set; }
}
