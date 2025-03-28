namespace NocoX.Identity.Dtos;

public class RoleGetDto
{
    public string Id { get; set; }

    public string Name { get; set; }

    public RoleStatus Status { get; set; }

    public string Description { get; set; }
}
