using System;
using System.Diagnostics.CodeAnalysis;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;

namespace NocoX.Workspaces;

public class Workspace : FullAuditedEntity<Guid>
{
    public Workspace([NotNull] string title)
    {
        Check.NotNullOrWhiteSpace(title, nameof(title));
        Title = title;
    }

    public string Title { get; set; }
}
