using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace NocoX.Workspaces
{
    public interface IWorkspaceRepository : IRepository<Workspace, Guid>
    {
        Task<List<Workspace>> GetListByMemberAsync(Guid userId);
    }
}
