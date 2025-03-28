using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace NocoX.Permissions;

public interface IPermissionGroupRepository : IRepository<PermissionGroup, Guid>
{
    Task<List<PermissionGroupQueryItem>> GetResultListAsync();
}
