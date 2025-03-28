using System;
using System.ComponentModel.DataAnnotations;

namespace NocoX.Apps.Dtos;

public class UpdatePageGroupInput
{
    [Required]
    public Guid Id { get; set; }

    [Required]
    public Guid AppId { get; set; }

    [Required]
    public string Title { get; set; }

    public string? Description { get; set; }

    public int Order { get; set; }
}
