using System;

namespace NocoX.Database;

public class TableRelationQueryItem
{
    public Guid? TableId { get; set; }

    public string? TableName { get; set; }

    public Guid? DisplayColumnId { get; set; }

    public string? DisplayColumnName { get; set; }
}
