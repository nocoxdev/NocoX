namespace NocoX.Resource.Dtos;

public class UploadResourceInput
{
    public string Name { get; set; }

    public byte[] File { get; set; }

    public string Extension { get; set; }

    public ResourceType Type { get; set; }
}
