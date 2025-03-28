using System;
using NocoX.Common.Dtos;

namespace NocoX.AppDatas.Dtos;

public class DataGetListInput : QueryListParamsInput
{
    public Guid TableId { get; set; }
}

public class DataGetPageListInput : QueryPageListParamsInput
{
    public Guid TableId { get; set; }
}
