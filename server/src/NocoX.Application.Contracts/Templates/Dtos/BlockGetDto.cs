using System;

namespace NocoX.Templates.Dtos;

public class BlockGetDto
{
    public Guid Id { get; set; }

    public string Name { get; set; }

    public string Cover { get; set; }

    public string Content { get; set; }

    public string IsPublic { get; set; }

    public string Tags { get; set; }

    public string Description { get; set; }

    public string creationTime { get; set; }
}
