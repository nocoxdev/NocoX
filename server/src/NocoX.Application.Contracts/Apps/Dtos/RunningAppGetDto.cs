using System;
using System.Collections.Generic;

namespace NocoX.Apps.Dtos;

public class RunningAppGetDto
{
    public Guid Id { get; set; }

    public string Title { get; set; }

    public string? Description { get; set; }

    public string? Favicon { get; set; }

    public List<PageGetDto> Pages { get; set; }
}
