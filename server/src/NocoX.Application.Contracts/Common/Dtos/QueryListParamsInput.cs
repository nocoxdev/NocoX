using System.Collections.Generic;

namespace NocoX.Common.Dtos;

public class QueryKeywordsInput
{
    public string? Keywords { get; set; }
}

public class QueryListParamsInput : QueryKeywordsInput
{
    public QueryFilterInput? Filter { get; set; }
    public List<QuerySortInput>? Sorts { get; set; }
}

public class QueryPageListParamsInput : QueryListParamsInput
{
    public int PageIndex { get; set; }

    public int PageSize { get; set; }
}
