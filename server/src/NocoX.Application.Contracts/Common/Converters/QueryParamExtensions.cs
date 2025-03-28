using System.Collections.Generic;
using System.Linq;
using NocoX.Common.Dtos;

namespace NocoX.Common.Converters;

public static class QueryParamExtensions
{
    public static List<DataSort> ToDataSorts(this List<QuerySortInput>? list)
    {
        if (list == null)
        {
            return [];
        }

        var sorts = list.Where(x => x.Name != null && x.Order != null)
            .Select(x =>
            {
                return new DataSort { FieldName = x.Name!.FirstLetterToUpperCase(), Order = (SortOrder)x.Order! };
            });

        return sorts.ToList() ?? [];
    }

    public static DataFilter? ToDataFilter(this QueryFilterInput? input)
    {
        if (input == null)
        {
            return null;
        }

        var filter = new DataFilter { Conjunction = input.Conjunction ?? DataFilterConjunction.And };
        var conditions = input
            .Conditions.Where(x =>
                !string.IsNullOrEmpty(x.Name) && x.Operator != null && x.Type != null && x.Value != null
            )
            .Select(x =>
            {
                return new DataFilterCondition
                {
                    Name = x.Name!.FirstLetterToUpperCase(),
                    Operator = (DataFilterOperator)x.Operator!,
                    ValueType = (UiType)x.Type!,
                    Value = x.Value,
                };
            });

        filter.Conditions = conditions.ToList()!;

        return filter;
    }

    public static string FirstLetterToUpperCase(this string input)
    {
        if (string.IsNullOrEmpty(input))
        {
            return input;
        }

        return char.ToUpper(input[0]) + input[1..];
    }
}
