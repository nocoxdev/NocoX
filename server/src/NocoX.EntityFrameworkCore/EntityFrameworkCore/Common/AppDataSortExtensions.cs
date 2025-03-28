using System.Collections.Generic;
using System.Linq;
using NocoX.Common;

namespace NocoX.EntityFrameworkCore.Common;

public static class AppDataSortExtensions
{
    public static string ToOrdering(this List<DataSort> sorts)
    {
        return sorts.Select(x => x.ToSortString()).JoinAsString(", ");
    }

    private static string ToSortString(this DataSort sort)
    {
        var fieldName = sort.FieldName;

        var order = sort.Order == SortOrder.Ascending ? "ASC" : "DESC";

        return $"{fieldName} {order}";
    }
}
