using System;
using System.Collections.Generic;

namespace NocoX.AppDatas.Dtos;

public class UpdateDataInput
{
    public Guid TableId { get; set; }

    public Guid Id { get; set; }

    public Dictionary<string, object?> Data { get; set; }
}
