using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Common;
using Volo.Abp.Domain.Repositories;

namespace NocoX.Identity;

public interface IRoleRepository : IRepository<Role, Guid>
{
    Task<(List<Role> roles, int total)> GetPageListAsync(
        int pageIndex,
        int pageSize,
        DataFilter? filter,
        List<DataSort> sorts,
        string keywords
    );

    Task<List<Role>> GetNormalListAsync();
}
