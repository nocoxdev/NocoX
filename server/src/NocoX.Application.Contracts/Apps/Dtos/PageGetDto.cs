using System.Collections.Generic;

namespace NocoX.Apps.Dtos;

public class PageGetDto
{
    public string Id { get; set; }

    public string? ParentId { get; set; }

    public string Path { get; set; }

    public string Title { get; set; }

    public PageType Type { get; set; }

    public int Order { get; set; }

    public string Content { get; set; }

    public string Description { get; set; }

    public bool Enabled { get; set; }
}
