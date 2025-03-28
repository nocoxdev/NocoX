using System;
using NocoX.Common.Dtos;

namespace NocoX.Dictionary.Dtos;

public class DictionaryDataGetPageListInput : PageListInput
{
    public Guid GroupId { get; set; }
}
