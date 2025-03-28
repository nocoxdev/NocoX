using System;

namespace NocoX.Apps.Dtos;

public class CommentHistoryInput
{
    public Guid Id { get; set; }

    public string? Comment { get; set; }
}
