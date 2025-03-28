using System;
using Volo.Abp.Domain.Entities;

namespace NocoX.Account;

public class RefreshToken : Entity<Guid>
{
    public string UserName { get; set; }

    public string Token { get; set; }

    public DateTime ExpireTime { get; set; }
}
