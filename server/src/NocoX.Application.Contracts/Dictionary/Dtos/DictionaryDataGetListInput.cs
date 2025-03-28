using System;
using NocoX.Common.Dtos;

namespace NocoX.Dictionary.Dtos;

public class DictionaryDataGetListInput : QueryKeywordsInput
{
    public Guid GroupId { get; set; }

    public bool IncludeChildren { get; set; }
}
