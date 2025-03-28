using System;
using System.ComponentModel.DataAnnotations;

namespace NocoX.Apps.Dtos;

public class CreateAppInput
{
    [Required]
    public Guid WorkspaceId { get; set; }

    [Required]
    public string Title { get; set; }

    public string Color { get; set; }
}
