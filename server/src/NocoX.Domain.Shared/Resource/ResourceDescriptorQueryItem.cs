using System;

namespace NocoX.Resource;

public class ResourceDescriptorQueryItem
{
    public Guid Id { get; set; }

    public string Path { get; set; }

    public string Name { get; set; }

    public ResourceType Type { get; set; }

    public string Extension { get; set; }

    public string Creator { get; set; }

    public DateTime CreationTime { get; set; }
}
