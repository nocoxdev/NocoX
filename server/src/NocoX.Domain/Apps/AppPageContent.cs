using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace NocoX.Apps;

public class AppPageContent : FullAuditedEntity<Guid>
{
    public AppPageContent(Guid pageId, string content)
    {
        PageId = pageId;
        Content = content;
    }

    public Guid PageId { get; set; }

    public string Content { get; set; }
}
