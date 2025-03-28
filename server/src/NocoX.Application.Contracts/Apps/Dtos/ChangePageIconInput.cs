using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NocoX.Apps.Dtos;

public class ChangePageIconInput
{
    [Required]
    public Guid Id { get; set; }

    public string? Icon { get; set; }
}
