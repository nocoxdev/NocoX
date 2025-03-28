using System;
using NocoX.Common.Dtos;

namespace NocoX.Apps.Dtos;

public class AppGetPageListInput : PageListInput
{
    public Guid WorkspaceId { get; set; }

    public string? Sorting { get; set; }
}
