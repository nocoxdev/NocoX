namespace NocoX.Common.Dtos;

public class PageListInput : QueryKeywordsInput
{
    public int PageIndex { get; set; }

    public int PageSize { get; set; }
}
