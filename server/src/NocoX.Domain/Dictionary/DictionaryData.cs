using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace NocoX.Dictionary;

public class DictionaryData : FullAuditedEntity<Guid>
{
    public DictionaryData(
        Guid groupId,
        Guid? parentId,
        string name,
        string title,
        string description,
        int order,
        bool enabled
    )
    {
        GroupId = groupId;
        ParentId = parentId;
        Name = name;
        Title = title;
        Description = description;
        Order = order;
        Enabled = enabled;
    }

    public Guid GroupId { get; set; }

    public Guid? ParentId { get; set; }

    public string Name { get; set; }

    public string Title { get; set; }

    public string Description { get; set; }

    public int Order { get; set; }

    public bool Enabled { get; set; }

    [NotMapped]
    public List<DictionaryData>? Children { get; set; }

    public void SetChildren(List<DictionaryData> children)
    {
        Children = children;
    }
}
