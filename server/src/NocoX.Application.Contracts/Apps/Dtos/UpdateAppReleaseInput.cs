using System;

namespace NocoX.Apps.Dtos;

public class UpdateAppReleaseInput
{
    public Guid Id { get; set; }

    public string Title { get; set; }

    public string Favicon { get; set; }

    public DateTime OnlineTime { get; set; }

    public DateTime OfflineTime { get; set; }

    public string Description { get; set; }
}
