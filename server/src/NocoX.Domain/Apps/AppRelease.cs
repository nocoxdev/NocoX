using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace NocoX.Apps;

public class AppRelease : FullAuditedEntity<Guid>
{
    public Guid AppId { get; set; }

    public string Title { get; set; }

    public string Color { get; set; }

    public string Favicon { get; set; }

    public string Version { get; set; }

    public int Order { get; set; }

    public string Content { get; set; }

    public DateTime OnlineTime { get; set; }

    public DateTime OfflineTime { get; set; }

    public string Description { get; set; }
}
