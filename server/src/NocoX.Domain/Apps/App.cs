using System;
using System.Diagnostics.CodeAnalysis;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;

namespace NocoX.Apps;

public class App : FullAuditedEntity<Guid>
{
    public App(Guid id, Guid workspaceId, [NotNull] string title, string color)
    {
        Check.NotNullOrWhiteSpace(title, nameof(title));
        Title = title;
        Color = color;
        WorkspaceId = workspaceId;
        Id = id;
    }

    public string Title { get; set; }

    public string? Description { get; set; }

    public string? Favicon { get; set; }

    public string Color { get; set; }

    public Guid WorkspaceId { get; set; }

    public void SetTitle(string title)
    {
        Check.NotNullOrWhiteSpace(title, nameof(title));
        Title = title;
    }

    public void SetFavicon(string? favicon)
    {
        Favicon = favicon;
    }

    public void SetColor(string color)
    {
        Color = color;
    }
}
