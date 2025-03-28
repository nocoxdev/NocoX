using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace NocoX.Templates.Dtos;

public class BlockCreateInput
{
    [Required]
    public string Name { get; set; }

    public string[] Tags { get; set; }

    [Required]
    public string Cover { get; set; }

    public bool IsPublic { get; set; }

    [Required]
    public string Content { get; set; }

    public string? Description { get; set; }
}
