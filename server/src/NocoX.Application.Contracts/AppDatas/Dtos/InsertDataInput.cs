using System;
using System.Collections.Generic;

namespace NocoX.AppDatas.Dtos;

public class InsertDataInput
{
    public Guid TableId { get; set; }

    public Dictionary<string, object?> Data { get; set; }
}
