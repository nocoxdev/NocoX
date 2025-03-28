using System;
using System.Text.RegularExpressions;
using NocoX.Common;
using Volo.Abp.Data;
using Volo.Abp.Domain.Entities.Auditing;

namespace NocoX.Database;

public class TableColumn : FullAuditedEntity<Guid>, IHasExtraProperties, IHasOrder
{
    public TableColumn(
        Guid id,
        Guid tableId,
        UiType uiType,
        string columnName,
        string title,
        string description,
        bool primaryKey,
        bool required,
        bool system,
        bool hidden,
        int order,
        int width
    )
    {
        Id = id;
        TableId = tableId;
        UiType = uiType;
        ColumnName = columnName;
        Title = title;
        Description = description;
        PrimaryKey = primaryKey;
        Required = required;
        System = system;
        Order = order;
        Width = width;
        Hidden = hidden;
        ExtraProperties = [];
    }

    public Guid TableId { get; set; }

    public string Title { get; set; }

    public string ColumnName { get; set; }

    public UiType UiType { get; set; }

    public bool System { get; set; }

    public bool PrimaryKey { get; set; }

    public string Description { get; set; }

    public bool Required { get; set; }

    public int Order { get; set; }

    public int Width { get; set; }

    public bool Hidden { get; set; }

    public ExtraPropertyDictionary ExtraProperties { get; set; }

    public void SetTableId(Guid tableId)
    {
        TableId = tableId;
    }

    public void SetOrder(int order)
    {
        Order = order;
    }
}
