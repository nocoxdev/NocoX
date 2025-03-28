using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NocoX.Account.Dtos;

public class UserPermissionGetDto
{
    public string GroupName { get; set; }

    public string PermissionName { get; set; }
}
