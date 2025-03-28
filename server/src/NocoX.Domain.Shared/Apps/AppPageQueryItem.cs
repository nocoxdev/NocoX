using System;

namespace NocoX.Apps;

public class AppPageQueryItem
{
    public Guid Id { get; set; }

    public Guid AppId { get; set; }

    public Guid? ParentId { get; set; }

    public string Path { get; set; }

    public PageType Type { get; set; }

    public string? Description { get; set; }

    public string Title { get; set; }

    public string Content { get; set; }

    public int Order { get; set; }
}
