using System;
using System.Collections.Generic;

namespace NocoX.Identity;

public class UserQueryItem
{
    public Guid Id { get; set; }

    public string UserName { get; set; }

    public string Email { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Avatar { get; set; }

    public string Password { get; set; }

    public UserStatus Status { get; set; }

    public string? Description { get; set; }

    public DateTime CreationTime { get; set; }

    public DateTime? LastModificationTime { get; set; }

    public List<RoleQueryItem> Roles { get; set; }
}
