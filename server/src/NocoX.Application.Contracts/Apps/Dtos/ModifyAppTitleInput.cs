using System;

namespace NocoX.Apps.Dtos;

public class ModifyAppTitleInput
{
    public Guid Id { get; set; }

    public string Title { get; set; }
}
