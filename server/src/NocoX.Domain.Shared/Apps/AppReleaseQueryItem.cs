using System;
using System.Collections.Generic;

namespace NocoX.Apps;

public class AppReleaseQueryItem
{
    public Guid Id { get; set; }

    public Guid AppId { get; set; }

    public string Title { get; set; }

    public string? Description { get; set; }

    public string? Favicon { get; set; }

    public List<AppPageQueryItem> Pages { get; set; }
}
