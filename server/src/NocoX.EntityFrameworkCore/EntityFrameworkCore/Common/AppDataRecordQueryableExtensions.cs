using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using NocoX.Common;
using NocoX.EntityFrameworkCore.Common;
using Volo.Abp.Auditing;
using Volo.Abp.Domain.Entities.Auditing;

namespace Layda.EntityFrameworkCore.Common;

public static class AppDataRecordQueryableExtensions
{
    public static IQueryable<T> ApplyDataFilter<T>(this IQueryable<T> queryable, DataFilter? filter)
    {
        try
        {
            if (filter == null || filter.Conditions.Count == 0)
            {
                return queryable;
            }

            var predicate = filter.ToWherePredicate();
            var config = new ParsingConfig { UseParameterizedNamesInDynamicQuery = true };
            return string.IsNullOrEmpty(predicate)
                ? queryable
                : queryable.Where(config, predicate, filter.GetValues());
        }
        catch
        {
            throw new Exception("Filter error");
        }
    }

    public static IQueryable<T> ApplyDataFilters<T>(
        this IQueryable<T> queryable,
        List<DataFilter> filterInfos
    )
    {
        foreach (var filterInfo in filterInfos)
        {
            queryable = queryable.ApplyDataFilter(filterInfo);
        }

        return queryable;
    }

    public static IQueryable<T> ApplyDataSort<T>(this IQueryable<T> queryable, List<DataSort> sorts) where T : IHasCreationTime
    {
        try
        {
            if (sorts.Count == 0)
            {
                return queryable.OrderByDescending(x=>x.CreationTime);
            }

            var ordering = sorts.ToOrdering();
            var config = new ParsingConfig { UseParameterizedNamesInDynamicQuery = true };
            return string.IsNullOrEmpty(ordering) ? queryable : queryable.OrderBy(config, ordering);
        }
        catch
        {
            throw new Exception("Sort error");
        }
    }
}
