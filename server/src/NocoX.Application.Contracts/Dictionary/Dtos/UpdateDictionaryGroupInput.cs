using System;
using System.ComponentModel.DataAnnotations;

namespace NocoX.Dictionary.Dtos;

public class UpdateDictionaryGroupInput
{
    public Guid Id { get; set; }

    [Required]
    [StringLength(50)]
    public string Title { get; set; }

    public string? Description { get; set; }
}
