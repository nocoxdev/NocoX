using System;

namespace NocoX.Common;

public interface IHasOrder
{
    public int Order { get; set; }
}

public interface IHasParentId
{
    public Guid? ParentId { get; set; }
}
