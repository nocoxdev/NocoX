using System;

namespace NocoX.Dictionary.Dtos;

public class UpdateDictionaryDataInput
{
    public Guid Id { get; set; }

    public string Name { get; set; }

    public string Title { get; set; }

    public string? Description { get; set; }

    public int Order { get; set; }

    public bool Enabled { get; set; }
}
