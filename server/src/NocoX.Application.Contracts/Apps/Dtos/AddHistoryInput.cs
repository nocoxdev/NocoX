using System;

namespace NocoX.Apps.Dtos;

public class AddHistoryInput
{
    public Guid AppId { get; set; }

    public string? Comment { get; set; }
}
