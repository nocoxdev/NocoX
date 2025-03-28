using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Layda.EntityFrameworkCore.Common;
using Microsoft.EntityFrameworkCore;
using NocoX.Common;
using NocoX.Identity;
using NocoX.Workspaces;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace NocoX.EntityFrameworkCore.Workspaces;

public class WorkspaceMemberRepository(IDbContextProvider<NocoXDbContext> dbContextProvider)
    : EfCoreRepository<NocoXDbContext, WorkspaceMember, Guid>(dbContextProvider),
        IWorkspaceMemberRepository
{
    public async Task<(List<UserQueryItem> users, int total)> GetPageListAsync(
        Guid workspaceId,
        Guid roleId,
        DataFilter? filter,
        List<DataSort> sorts,
        string keywords
    )
    {
        var dbContext = await GetDbContextAsync();
        var queryable =
            from workspaceUser in dbContext.Set<WorkspaceMember>()
            where workspaceUser.WorkspaceId == workspaceId
            join user in dbContext
                .Set<User>()
                .WhereIf(
                    !string.IsNullOrWhiteSpace(keywords),
                    x => x.UserName.Contains(keywords) || x.Email.Contains(keywords)
                )
                .ApplyDataFilter(filter)
                .ApplyDataSort(sorts)
                on workspaceUser.UserId equals user.Id
            join userRole in dbContext.Set<UserRole>() on user.Id equals userRole.UserId into userRoles
            from userRole in userRoles.DefaultIfEmpty()
            join role in dbContext.Set<Role>() on userRole.RoleId equals role.Id into roleGroup
            from role in roleGroup.DefaultIfEmpty()
            group role by user into g
            where roleId == Guid.Empty || g.Select(x => x.Id).Contains(roleId)
            select new { User = g.Key, Roles = g.Where(x => x != null) };

        var total = await queryable.CountAsync();

        var users = queryable
            .ToList()
            .Select(x => new UserQueryItem
            {
                Id = x.User.Id,
                UserName = x.User.UserName,
                Email = x.User.Email,
                Avatar = x.User.Avatar,
                PhoneNumber = x.User.PhoneNumber,
                CreationTime = x.User.CreationTime,
                Status = x.User.Status,
                Description = x.User.Description,
                Roles = [.. x.Roles.Select(y => new RoleQueryItem { Id = y.Id, Name = y.Name })],
            });

        return (users.ToList(), total);
    }

    public async Task<(List<UserQueryItem> users, int total)> GetRestPageListAsync(
        Guid workspaceId,
        Guid roleId,
        DataFilter? filter,
        List<DataSort> sorts,
        string keywords
    )
    {
        var dbContext = await GetDbContextAsync();

        var queryable =
            from user in dbContext
                .Set<User>()
                .WhereIf(
                    !string.IsNullOrWhiteSpace(keywords),
                    x => x.UserName.Contains(keywords) || x.Email.Contains(keywords)
                )
                .ApplyDataFilter(filter)
                .ApplyDataSort(sorts)

            join workspaceUser in dbContext.Set<WorkspaceMember>().Where(x => x.WorkspaceId == workspaceId)
                on user.Id equals workspaceUser.UserId
                into userGroup
            from workspaceUser in userGroup.DefaultIfEmpty()
            where workspaceUser == null
            join userRole in dbContext.Set<UserRole>() on user.Id equals userRole.UserId into userRoles
            from userRole in userRoles.DefaultIfEmpty()
            join role in dbContext.Set<Role>() on userRole.RoleId equals role.Id
            group role by user into g
            where roleId == Guid.Empty || g.Select(x => x.Id).Contains(roleId)
            select new { User = g.Key, Roles = g.Where(x => x != null) };

        var total = await queryable.CountAsync();

        var users = queryable
            .ToList()
            .Select(x => new UserQueryItem
            {
                Id = x.User.Id,
                UserName = x.User.UserName,
                Email = x.User.Email,
                Avatar = x.User.Avatar,
                PhoneNumber = x.User.PhoneNumber,
                CreationTime = x.User.CreationTime,
                Status = x.User.Status,
                Description = x.User.Description,
                Roles =
                [
                    .. x.Roles.Select(y => new RoleQueryItem
                    {
                        Id = y.Id,
                        Name = y.Name,
                        Description = y.Description,
                    }),
                ],
            });

        return (users.ToList(), total);
    }
}
