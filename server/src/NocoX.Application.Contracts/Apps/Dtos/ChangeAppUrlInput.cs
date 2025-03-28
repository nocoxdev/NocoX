using System;

namespace NocoX.Apps.Dtos;

public class ChangeAppUrlInput
{
    public Guid Id { get; set; }

    public string? Url { get; set; }
}
