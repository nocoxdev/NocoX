using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NocoX.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace NocoX.Workspaces;

public class WorkspaceRepository(IDbContextProvider<NocoXDbContext> dbContextProvider)
    : EfCoreRepository<NocoXDbContext, Workspace, Guid>(dbContextProvider),
        IWorkspaceRepository
{
    public async Task<List<Workspace>> GetListByMemberAsync(Guid userId)
    {
        var dbContext = await GetDbContextAsync();
        var queryable = dbContext
            .Set<Workspace>()
            .Where(w =>
                w.CreatorId == userId
                || dbContext.Set<WorkspaceMember>().Any(wu => wu.WorkspaceId == w.Id && wu.UserId == userId)
            );
        return [.. queryable];
    }
}
