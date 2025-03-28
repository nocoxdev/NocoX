using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NocoX.Account;

public class AuthResult
{
    public required string AccessToken { get; set; }

    public required RefreshToken RefreshToken { get; set; }
}
