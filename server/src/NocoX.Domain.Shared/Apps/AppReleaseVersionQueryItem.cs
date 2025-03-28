

using System;

namespace NocoX.Apps;

public class AppReleaseVersionQueryItem
{
    public Guid Id { get; set; }

    public string Version { get; set; }

    public string Favicon { get; set; }

    public DateTime ReleaseTime { get; set; }

    public string Description { get; set; }
}
