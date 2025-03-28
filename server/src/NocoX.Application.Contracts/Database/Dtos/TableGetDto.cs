using System;

namespace NocoX.Database.Dtos;

public class TableGetDto
{
    public Guid Id { get; set; }

    public string Title { get; set; }

    public int Order { get; set; }

    public string Description { get; set; }
}
