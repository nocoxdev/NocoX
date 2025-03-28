using NocoX.Common;

namespace NocoX.Database;

public class ColumnInfo
{
    public string Name { get; set; }

    public UiType UiType { get; set; }

    public TableRelationQueryItem? Relation { get; set; }

    public string Alias { get; set; }
}
