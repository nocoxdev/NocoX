using System;
using System.ComponentModel.DataAnnotations;

namespace NocoX.Identity.Dtos;

public class CreateUserInput
{
    [Required]
    public string UserName { get; set; }

    [Required]
    public string Email { get; set; }

    public string? PhoneNumber { get; set; }

    public string Password { get; set; }

    [Required]
    public Guid[] Roles { get; set; }

}
