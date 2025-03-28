using System;

namespace NocoX.Dictionary.Dtos;

public class AddDictionaryDataInput
{
    public Guid GroupId { get; set; }

    public Guid? ParentId { get; set; }

    public string Name { get; set; }

    public string Title { get; set; }

    public string? Description { get; set; }

    public int Order { get; set; }

    public bool Enabled { get; set; }
}
