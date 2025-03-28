using System.Collections.Generic;

namespace NocoX.Common.Dtos;

public class DataFilterConditionInput
{
    public string? Name { get; set; }

    public DataFilterOperator? Operator { get; set; }

    public object? Value { get; set; }

    public UiType? Type { get; set; }
}

public class QueryFilterInput
{
    public DataFilterConjunction? Conjunction { get; set; }

    public List<DataFilterConditionInput> Conditions { get; set; } = [];
}
