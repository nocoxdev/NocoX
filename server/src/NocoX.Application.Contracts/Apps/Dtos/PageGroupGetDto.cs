using System.Collections.Generic;

namespace NocoX.Apps.Dtos;

public class PageGroupGetDto
{
    public string Id { get; set; }
    public string AppId { get; set; }

    public string Title { get; set; }

    public string? Description { get; set; }

    public int Order { get; set; }

    public bool Enabled { get; set; }

    public List<PageGetDto> Pages { get; set; }
}
