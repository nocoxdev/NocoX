using System;

namespace NocoX.Apps;

public class HistoryQueryItem
{
    public Guid Id { get; set; }

    public Guid AppId { get; set; }

    public string Comment { get; set; }

    public DateTime CreationTime { get; set; }

    public string Creator { get; set; }
}
