using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Layda.EntityFrameworkCore.Common;
using Microsoft.EntityFrameworkCore;
using NocoX.Common;
using NocoX.Identity;
using NocoX.Permissions;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace NocoX.EntityFrameworkCore.Identity;

public class UserRepository(IDbContextProvider<NocoXDbContext> dbContextProvider)
    : EfCoreRepository<NocoXDbContext, User, Guid>(dbContextProvider),
        IUserRepository
{
    public async Task<UserQueryItem> GetResultByIdAsync(Guid id)
    {
        var queryable = (await GetQueryableAsync()).Where(x => x.Id == id);

        return (await ToResult(queryable)).ToList().FirstOrDefault()
            ?? throw new EntityNotFoundException(typeof(User), id);
    }

    public async Task<(List<UserQueryItem> users, int total)> GetResultPageListAsync(
        int pageIndex,
        int pageSize,
        DataFilter? filter,
        List<DataSort> sorts,
        string keywords
    )
    {
        var queryable = (await GetQueryableAsync())
            .Where(x => x.UserName.Contains(keywords))
            .ApplyDataFilter(filter)
            .ApplyDataSort(sorts)
            .OrderByDescending(x => x.LastModificationTime);

        var users = await ToResult(queryable.TakePage(pageIndex, pageSize), keywords);
        var total = await queryable.CountAsync();

        return (users, total);
    }

    public async Task<List<UserQueryItem>> GetResultListAsync(DataFilter? filter, List<DataSort> sorts, string keywords)
    {
        var queryable = (await GetQueryableAsync())
            .WhereIf(
                !string.IsNullOrWhiteSpace(keywords),
                x =>
                    x.UserName.Contains(keywords)
                    || x.Email.Contains(keywords)
                    || (x.PhoneNumber != null && x.PhoneNumber.Contains(keywords))
            )
            .ApplyDataFilter(filter)
            .ApplyDataSort(sorts);
        return await ToResult(queryable, keywords);
    }

    public async Task<List<UserPermissionGrantQueryItem>> GetPermissionGrantResultListByIdAsync(Guid id)
    {
        var dbContext = await GetDbContextAsync();

        var query =
            from user in dbContext.Set<User>()
            where user.Id == id
            join userRole in dbContext.Set<UserRole>() on user.Id equals userRole.UserId
            join role in dbContext.Set<Role>().Where(x => x.Status == RoleStatus.Normal)
                on userRole.RoleId equals role.Id
            join grant in dbContext.Set<PermissionGrant>() on role.Id equals grant.RoleId
            join permission in dbContext.Set<Permission>() on grant.PermissionId equals permission.Id
            join permissionGroup in dbContext.Set<PermissionGroup>() on permission.GroupId equals permissionGroup.Id

            select new UserPermissionGrantQueryItem
            {
                GroupName = permissionGroup.Name,
                PermissionName = permission.Name,
            };

        return await query.Distinct().ToListAsync();
    }

    protected async Task<List<UserQueryItem>> ToResult(IQueryable<User> queryable, string keywords = "")
    {
        var dbContext = await GetDbContextAsync();

        var query =
            from user in queryable
            join userRole in dbContext.Set<UserRole>() on user.Id equals userRole.UserId into userRoles
            from userRole in userRoles.DefaultIfEmpty()
            join role in dbContext
                .Set<Role>()
                .Where(x => x.Status == RoleStatus.Normal)
                .WhereIf(!string.IsNullOrWhiteSpace(keywords), x => x.Name.Contains(keywords))
                on userRole.RoleId equals role.Id
                into roles
            from role in roles.DefaultIfEmpty()

            group role by user into g
            select new { User = g.Key, Roles = g.Where(x => x != null) };

        return
        [
            .. query
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
                }),
        ];
    }
}
