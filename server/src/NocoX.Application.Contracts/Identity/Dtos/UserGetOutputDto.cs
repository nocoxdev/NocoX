using System.Collections.Generic;
using NocoX.Identity;

namespace NocoX.Identity.Dtos;

public class UserGetOutputDto
{
    public required string Id { get; set; }

    public required string UserName { get; set; }

    public required string Email { get; set; }

    public required string PhoneNumber { get; set; }

    public required string Avatar { get; set; }

    public UserStatus Status { get; set; }

    public required string CreationTime { get; set; }

    public List<RoleGetDto> Roles { get; set; }
}
