using System;
using System.ComponentModel.DataAnnotations;
using NocoX.Common;

namespace NocoX.Database.Dtos;

public class UpdateTableColumnInput
{
    public Guid Id { get; set; }

    [Required]
    [StringLength(50)]
    [RegularExpression(
        @"^[a-z][a-zA-Z0-9_]*$",
        ErrorMessage = "Only a-z,A-Z,_ are allowed and it must start with lowercase"
    )]
    public required string ColumnName { get; set; }

    [Required]
    [StringLength(100)]
    public required string Title { get; set; }

    [StringLength(500)]
    public string? Description { get; set; }

    public UiType UiType { get; set; }

    public TableColumnRelationInput? Relation { get; set; }

    public bool Required { get; set; }
}
