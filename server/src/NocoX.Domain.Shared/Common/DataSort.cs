using System;

namespace NocoX.Common;

public class DataSort
{
    public required string FieldName { get; set; }

    public SortOrder Order { get; set; }
}
