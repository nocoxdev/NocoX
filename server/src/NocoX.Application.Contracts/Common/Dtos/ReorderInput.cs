using System;

namespace NocoX.Common.Dtos;

public class ReorderInput
{
    public Guid Id { get; set; }

    public Guid? ToParentId { get; set; }

    public int ToIndex { get; set; }
}
