using System.Collections.Generic;
using System.Linq;
using NocoX.Common;

namespace NocoX.Database;

public static class ColumnsExtensions
{
    public static bool HasCreatedBy(this List<ColumnInfo> columns)
    {
        return columns.Any(x => x.UiType == UiType.CreatedBy);
    }

    public static bool HasCreatedTime(this List<ColumnInfo> columns)
    {
        return columns.Any(x => x.UiType == UiType.CreatedTime);
    }

    public static bool HasLastModifiedBy(this List<ColumnInfo> columns)
    {
        return columns.Any(x => x.UiType == UiType.LastModifiedBy);
    }

    public static bool HasLastModifiedTime(this List<ColumnInfo> columns)
    {
        return columns.Any(x => x.UiType == UiType.LastModifiedTime);
    }

    public static bool HasDeletedBy(this List<ColumnInfo> columns)
    {
        return columns.Any(x => x.UiType == UiType.DeletedBy);
    }

    public static bool HasDeletedTime(this List<ColumnInfo> columns)
    {
        return columns.Any(x => x.UiType == UiType.DeletedTime);
    }

    public static bool HasIsDeleted(this List<ColumnInfo> columns)
    {
        return columns.Any(x => x.UiType == UiType.IsDeleted);
    }
}
