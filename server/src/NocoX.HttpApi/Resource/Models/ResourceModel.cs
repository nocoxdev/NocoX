using Microsoft.AspNetCore.Http;

namespace NocoX.Resource.Models;

public class ResourceModel
{
    public IFormFile File { get; set; }

    public ResourceType Type { get; set; }
}
