using System;

namespace NocoX.AppDatas.Dtos;

public class DataGetByIdInput
{
    public Guid TableId { get; set; }

    public Guid Id { get; set; }
}

public class DataGetByUserInput
{
    public Guid TableId { get; set; }

    public Guid UserId { get; set; }
}
