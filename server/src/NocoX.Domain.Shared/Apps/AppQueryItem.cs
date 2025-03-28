using System;

namespace NocoX.Apps;

public class AppQueryItem
{
    public Guid Id { get; set; }

    public required string Title { get; set; }

    public string? Description { get; set; }

    public string? Favicon { get; set; }

    public string? Url { get; set; }

    public required string Color { get; set; }

    public Guid WorkspaceId { get; set; }

    public required string WorkspaceTitle { get; set; }

    public Guid? LastModifierId { get; set; }

    public string? LastModifier { get; set; }

    public required string Creator { get; set; }

    public DateTime CreationTime { get; set; }

    public DateTime? LastModificationTime { get; set; }
}
