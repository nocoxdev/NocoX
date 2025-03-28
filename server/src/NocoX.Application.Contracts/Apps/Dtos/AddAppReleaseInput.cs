using System;

namespace NocoX.Apps.Dtos;

public class AddAppReleaseInput
{
    public Guid Id { get; set; }

    public string Version { get; set; }

    public DateTime OnlineTime { get; set; }

    public DateTime? OfflineTime { get; set; }

    public string? Description { get; set; }
}
