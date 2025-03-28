using System;

namespace NocoX.Apps.Dtos;

public class AppReleaseGetDto
{
    public Guid Id { get; set; }

    public Guid AppId { get; set; }

    public string Title { get; set; }

    public string Favicon { get; set; }

    public string Version { get; set; }

    public string Description { get; set; }

    public DateTime OnlineTime { get; set; }

    public DateTime OfflineTime { get; set; }

    public DateTime CreationTime { get; set; }
}
