using System;

namespace NocoX.Apps.Dtos;

public class AppReleaseVersionGetDto
{
    public Guid Id { get; set; }

    public string Version { get; set; }

    public string Favicon { get; set; }

    public DateTime ReleaseTime { get; set; }

    public string Description { get; set; }
}
