using System.ComponentModel.DataAnnotations;

namespace NocoX.Identity.Dtos;

public class CreateRoleInput
{
    [Required]
    public string Name { get; set; }

    public string? Description { get; set; }
}
