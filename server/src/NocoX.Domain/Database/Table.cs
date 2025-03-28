using System;
using System.Text.RegularExpressions;
using NocoX.Common;
using Volo.Abp.Domain.Entities.Auditing;

namespace NocoX.Database;

public class Table : FullAuditedEntity<Guid>, IHasOrder
{
    public Table(Guid id, string title, int order, string description)
        : base(id)
    {
        Id = id;

        Title = title;
        Description = description;
        Order = order;
        TableName = GetTableName();
    }

    public string TableName { get; set; }

    public string Title { get; set; }

    public string Description { get; set; }

    public int Order { get; set; }

    public string GetTableName()
    {
        var suffix = Regex.Replace($"{Title}_{Convert.ToBase64String(Id.ToByteArray())}", @"[^a-zA-Z]", "");

        return $"{NocoXDbProperties.AppTablePrefix}{suffix}";
    }
}
