using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace NocoX.Dictionary;

public class DictionaryGroup : FullAuditedEntity<Guid>
{
    public DictionaryGroup(string title, string description)
    {
        Title = title;
        Description = description;
    }

    public string Title { get; set; }

    public string Description { get; set; }
}
