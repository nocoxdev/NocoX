using System.Linq;

namespace NocoX.EntityFrameworkCore;

public static class QueryableExtensions
{
    public static IQueryable<T> TakePage<T>(this IQueryable<T> queryable, int pageIndex, int pageSize)
    {
        var skipCount = ((pageIndex <= 0 ? 1 : pageIndex) - 1) * pageSize;

        return queryable.PageBy(skipCount, pageSize);
    }
}
