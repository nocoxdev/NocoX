using System;
using System.ComponentModel.DataAnnotations;

namespace NocoX.Templates.Dtos;

public class BlockUpdateInput
{
    [Required]
    public Guid Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public string Cover { get; set; }

    [Required]
    public string Content { get; set; }
}
