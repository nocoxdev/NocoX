using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Common;
using NocoX.Permissions;
using Volo.Abp.Domain.Repositories;

namespace NocoX.Identity;

public interface IUserRepository : IRepository<User, Guid>
{
    Task<(List<UserQueryItem> users, int total)> GetResultPageListAsync(
        int pageIndex,
        int pageSize,
        DataFilter? filter,
        List<DataSort> sorts,
        string keywords
    );

    Task<UserQueryItem> GetResultByIdAsync(Guid id);

    Task<List<UserQueryItem>> GetResultListAsync(DataFilter? filter, List<DataSort> sorts, string keywords);

    Task<List<UserPermissionGrantQueryItem>> GetPermissionGrantResultListByIdAsync(Guid id);
}
