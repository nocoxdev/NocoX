using System;
using System.Collections.Generic;

namespace NocoX.Dictionary.Dtos;

public class DictionaryDataGetDto
{
    public Guid Id { get; set; }

    public string Name { get; set; }

    public string Title { get; set; }

    public string Description { get; set; }

    public int Order { get; set; }

    public bool Enabled { get; set; }

    public List<DictionaryDataGetDto>? Children { get; set; }
}
