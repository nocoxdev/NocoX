using System;
using System.Collections.Generic;

namespace NocoX.AppDatas.Dtos;

public class DeleteDataInput
{
    public Guid TableId { get; set; }

    public List<Guid> Ids { get; set; }
}
