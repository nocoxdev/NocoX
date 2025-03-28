using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace NocoX.Templates;

public class Block : FullAuditedEntity<Guid>
{
    public string Name { get; set; }

    public string Tags { get; set; }

    public string Content { get; set; }

    public bool IsPublic { get; set; }

    public string Cover { get; set; }

    public string Description { get; set; }
}
