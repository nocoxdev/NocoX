using System;
using NocoX.Common.Dtos;

namespace NocoX.Apps.Dtos;

public class HistoryPageListInput : QueryPageListParamsInput
{
    public Guid AppId { get; set; }
}
