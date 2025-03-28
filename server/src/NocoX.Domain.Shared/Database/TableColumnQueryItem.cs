using System;
using NocoX.Common;

namespace NocoX.Database;

public class TableColumnQueryItem
{
    public Guid Id { get; set; }

    public Guid TableId { get; set; }

    public string ColumnName { get; set; }

    public string Title { get; set; }

    public string Description { get; set; }

    public bool System { get; set; }

    public bool PrimaryKey { get; set; }

    public bool Required { get; set; }

    public int Order { get; set; }

    public int Width { get; set; }

    public bool Hidden { get; set; }

    public UiType UiType { get; set; }

    public TableRelationQueryItem? Relation { get; set; }
}
