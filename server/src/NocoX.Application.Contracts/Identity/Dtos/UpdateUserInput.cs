using System;
using System.ComponentModel.DataAnnotations;

namespace NocoX.Identity.Dtos;

public class UpdateUserInput
{
    public Guid Id { get; set; }

    [Required]
    public string UserName { get; set; }

    [Required]
    public string Email { get; set; }

    public string PhoneNumber { get; set; }

    public Guid[] Roles { get; set; }
}
