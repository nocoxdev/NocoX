﻿namespace NocoX.Account.Dtos;

public class UserGetProfileDto
{
    public required string Avatar { get; set; }

    public required string UserName { get; set; }

    public required string Email { get; set; }

    public required string PhoneNumber { get; set; }

    public required string Description { get; set; }
}
