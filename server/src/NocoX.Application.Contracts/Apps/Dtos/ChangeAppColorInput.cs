using System;
using System.ComponentModel.DataAnnotations;

namespace NocoX.Apps.Dtos;

public class ChangeAppColorInput
{
    [Required]
    public Guid Id { get; set; }

    [Required]
    public required string Color { get; set; }
}
