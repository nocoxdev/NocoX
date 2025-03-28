using System;
using System.ComponentModel.DataAnnotations;

namespace NocoX.Apps.Dtos;

public class UpdatePageContentInput
{
    [Required]
    public Guid Id { get; set; }

    public string? Comment { get; set; }

    public required string Content { get; set; }
}
