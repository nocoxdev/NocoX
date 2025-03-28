using System;

namespace NocoX.Common;

public class DataFilterCondition
{
    public required string Name { get; set; }

    public UiType ValueType { get; set; }

    public DataFilterOperator Operator { get; set; }

    public object? Value { get; set; }
}
