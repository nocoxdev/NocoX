using System;
using System.ComponentModel.DataAnnotations;

namespace NocoX.Apps.Dtos;

public class ChangeAppFaviconInput
{
    [Required]
    public Guid Id { get; set; }

    public string? Favicon { get; set; }
}
