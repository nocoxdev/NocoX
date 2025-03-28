using System.Collections.Generic;

namespace NocoX.Common;

public class DataFilter
{
    public DataFilterConjunction Conjunction { get; set; } = DataFilterConjunction.And;

    public List<DataFilterCondition> Conditions { get; set; } = [];
}
