using System;
using System.Collections.Generic;
using System.Linq;
using NocoX.Common;

namespace NocoX.EntityFrameworkCore.Common;

public static class AppDataFilterExtensions
{
    public static string ToWherePredicate(this DataFilter filterInfo)
    {
        var conjunction = filterInfo.Conjunction == DataFilterConjunction.And ? "&&" : "||";

        return filterInfo
            .Conditions.Select((x, index) => x.ToConditionString(index))
            .ToList()
            .JoinAsString(conjunction);
    }

    public static object[] GetValues(this DataFilter filterInfo)
    {
        return filterInfo.Conditions.Select(x => x.ToRight()).ToArray();
    }

    private static string ToConditionString(this DataFilterCondition condition, int index)
    {
        var left = condition.ToLeft();
        var right = $"@{index}";

        var clause = condition.Operator switch
        {
            DataFilterOperator.Equal => $"{left} == {right}",
            DataFilterOperator.NotEqual => $"{left} != {right}",
            DataFilterOperator.GreaterThan => $"{left} > {right}",
            DataFilterOperator.GreaterThanEqual => $"{left} >= {right}",
            DataFilterOperator.LessThan => $"{left} < {right}",
            DataFilterOperator.LessThanEqual => $"{left} <= {right}",
            DataFilterOperator.StartWith => $"{left}.StartsWith({right})",
            DataFilterOperator.EndWith => $"{left}.EndsWith({right})",
            DataFilterOperator.Contain => $"{left}.Contains({right})",
            DataFilterOperator.NotContain => $"!{left}.Contains({right})",
            _ => throw new ArgumentOutOfRangeException(condition.Operator.ToString()),
        };

        return $"({clause})";
    }

    private static object ToRight(this DataFilterCondition condition)
    {
        var Value = condition.Value;

        return condition.ValueType switch
        {
            UiType.Bool => Convert.ToBoolean(Value),
            UiType.Integer => Convert.ToInt32(Value),
            UiType.Percent => Convert.ToDecimal(Value),
            UiType.Decimal => Convert.ToDecimal(Value),
            _ => Convert.ToString(Value) ?? "",
        };
    }

    private static string ToLeft(this DataFilterCondition condition)
    {
        return condition.Name;
    }
}
