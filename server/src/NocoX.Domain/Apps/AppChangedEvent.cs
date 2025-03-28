using System;

namespace NocoX.Apps;

public class AppChangedEvent
{
    public Guid AppId { get; set; }

    public bool Forced { get; set; } = false;
    public string? Comment { get; set; }

}
