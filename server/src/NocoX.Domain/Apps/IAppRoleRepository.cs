using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Identity;
using Volo.Abp.Domain.Repositories;

namespace NocoX.Apps;

public interface IAppRoleRepository : IRepository<AppRole, Guid>
{
    Task<List<Role>> GetListAsync(Guid appId);

    Task<List<Role>> GetUnGrantedListAsync(Guid appId, string keywords);
}
