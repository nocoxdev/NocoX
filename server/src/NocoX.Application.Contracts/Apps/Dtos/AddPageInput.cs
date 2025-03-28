using System;
using System.ComponentModel.DataAnnotations;

namespace NocoX.Apps.Dtos;

public class AddPageInput
{
    public string? Path { get; set; }

    [Required]
    public string Title { get; set; }

    public string? Description { get; set; }

    public Guid AppId { get; set; }

    public Guid? ParentId { get; set; }

    public PageType Type { get; set; }

    public string? Content { get; set; }
}
