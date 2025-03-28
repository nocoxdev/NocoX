using System;
using System.Collections.Generic;

namespace NocoX.Apps.Dtos;

public class AppGetDto
{
    public string Id { get; set; }

    public string Title { get; set; }

    public string? Favicon { get; set; }

    public string Color { get; set; }

    public string WorkspaceId { get; set; }

    public string WorkspaceTitle { get; set; }

    public string LastModifier { get; set; }

    public DateTime LastModificationTime { get; set; }

    public List<PageGetDto> Pages { get; set; }
}
