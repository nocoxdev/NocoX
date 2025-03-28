using System;

namespace NocoX.Workspaces.Dtos;

public class ModifyWorkspaceTitleInput
{
    public Guid Id { get; set; }

    public string Title { get; set; }
}
