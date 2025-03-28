using System.ComponentModel.DataAnnotations;

namespace NocoX.Dictionary.Dtos;

public class CreateDictionaryGroupInput
{
    [Required]
    [StringLength(50)]
    public string Title { get; set; }

    public string? Description { get; set; }
}
