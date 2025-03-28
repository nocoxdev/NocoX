using System;
using System.ComponentModel.DataAnnotations;

namespace NocoX.Identity.Dtos;

public class ResetPasswordInput
{
    [Required]
    public Guid Id { get; set; }

    [Required]
    public string NewPassword { get; set; }

    [Required]
    public string ConfirmPassword { get; set; }

}
