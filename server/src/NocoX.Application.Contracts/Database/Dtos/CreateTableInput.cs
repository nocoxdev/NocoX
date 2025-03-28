using System;
using System.ComponentModel.DataAnnotations;

namespace NocoX.Database.Dtos;

public class CreateTableInput
{
    [Required]
    [StringLength(100)]
    public string Title { get; set; }

    [StringLength(500)]
    public string? Description { get; set; }
}
