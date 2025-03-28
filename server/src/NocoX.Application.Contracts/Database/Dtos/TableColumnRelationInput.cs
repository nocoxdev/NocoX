using System;

namespace NocoX.Database.Dtos;

public class TableColumnRelationInput
{
    public Guid? TableId { get; set; }

    public Guid? DisplayColumnId { get; set; }
}
