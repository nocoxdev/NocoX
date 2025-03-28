using System;

namespace NocoX.AppDatas;

public class AppDataRecordQueryItem
{
    public Guid Id { get; set; }

    public Guid AppId { get; set; }

    public Guid TableId { get; set; }

    public Guid FormId { get; set; }

    public string Data { get; set; }

    public string Creator { get; set; }

    public DateTime CreationTime { get; set; }

    public Guid CreatorId { get; set; }

    public string? LastModifier { get; set; }

    public DateTime? LastModificationTime { get; set; }

    public Guid? LastModifierId { get; set; }
}
