namespace NocoX.Apps.Dtos;

public class HistoryGetPageListDto
{
    public required string Id { get; set; }

    public string? Comment { get; set; }

    public required string CreationTime { get; set; }

    public required string Creator { get; set; }
}
