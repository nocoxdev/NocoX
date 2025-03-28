using System;
using System.Diagnostics.CodeAnalysis;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;

namespace NocoX.Resource;

public class ResourceDescriptor : FullAuditedEntity<Guid>
{
    public ResourceDescriptor(Guid id, [NotNull] string name, ResourceType type, string extension)
    {
        Check.NotNullOrWhiteSpace(name, nameof(name));
        Id = id;
        Name = name;
        Type = type;
        Extension = extension;
    }

    public string Name { get; set; }

    public ResourceType Type { get; set; }

    public string Extension { get; set; }
}
