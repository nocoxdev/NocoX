﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NocoX.Account.Dtos;

public class ChangePasswordInput
{
    public string OldPassword { get; set; }

    public string NewPassword { get; set; }

    public string ConfirmPassword { get; set; }
}
