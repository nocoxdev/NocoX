using System;

namespace NocoX.AppDatas.Dtos;

public class DataGetDto
{
    public Guid Id { get; set; }

    public Guid AppId { get; set; }

    public Guid TableId { get; set; }

    public object Data { get; set; }
}
