using System;

namespace NocoX.Apps.Dtos;

public class MyAppGetDto
{
    public Guid Id { get; set; }

    public Guid AppId { get; set; }

    public string Title { get; set; }

    public string Color { get; set; }

    public string? Description { get; set; }

    public string? Favicon { get; set; }
}
