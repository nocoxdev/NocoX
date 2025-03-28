using System;
using System.ComponentModel.DataAnnotations;

namespace NocoX.Apps.Dtos;

public class UpdatePageInput
{
    [Required]
    public Guid Id { get; set; }

    public string? Path { get; set; }

    public string Title { get; set; }

    public string? Description { get; set; }
}
