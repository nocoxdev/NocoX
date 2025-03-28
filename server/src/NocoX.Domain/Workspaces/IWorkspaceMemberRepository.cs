using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Common;
using NocoX.Identity;
using Volo.Abp.Domain.Repositories;

namespace NocoX.Workspaces;

public interface IWorkspaceMemberRepository : IRepository<WorkspaceMember, Guid>
{
    Task<(List<UserQueryItem> users, int total)> GetPageListAsync(
        Guid workspaceId,
        Guid roleId,
        DataFilter? filter,
        List<DataSort> sorts,
        string keywords
    );

    Task<(List<UserQueryItem> users, int total)> GetRestPageListAsync(
        Guid workspace,
        Guid roleId,
        DataFilter? filter,
        List<DataSort> sorts,
        string keywords
    );
}
