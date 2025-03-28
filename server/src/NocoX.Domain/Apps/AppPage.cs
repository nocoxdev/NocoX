using System;
using System.Diagnostics.CodeAnalysis;
using NocoX.Common;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;

namespace NocoX.Apps;

public class AppPage : FullAuditedEntity<Guid>, IHasOrder, IHasParentId
{
    public AppPage(Guid appId, Guid? parentId, string path, [NotNull] string title, PageType type, string? description)
    {
        Check.NotNull(appId, nameof(appId));
        Path = path;
        Title = title;
        Description = description;
        AppId = appId;
        ParentId = parentId;
        Type = type;
    }

    public Guid AppId { get; set; }

    public Guid? ParentId { get; set; }

    public string Path { get; set; }

    public string Title { get; set; }

    public string? Description { get; set; }

    public int Order { get; set; }

    public bool Enabled { get; set; }

    public PageType Type { get; set; }
}
