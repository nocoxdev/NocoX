using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace NocoX.Templates;

public class Template : FullAuditedEntity<Guid>
{
    public string Name { get; set; }

    public string Description { get; set; }

    public string Content { get; set; }
}
