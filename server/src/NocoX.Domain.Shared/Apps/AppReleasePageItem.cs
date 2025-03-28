using System;

namespace NocoX.Apps;

public class AppReleasePageItem
{
    public Guid Id { get; set; }

    public Guid? ParentId { get; set; }

    public string Path { get; set; }

    public PageType Type { get; set; }

    public string Title { get; set; }

    public string Content { get; set; }
}
