using System;
using NocoX.EntityFrameworkCore;
using NocoX.Permissions;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace NocoX.EntityFrameworkCore.Permissions;

public class PermissionRepository(IDbContextProvider<NocoXDbContext> dbContextProvider)
    : EfCoreRepository<NocoXDbContext, Permission, Guid>(dbContextProvider),
        IPermissionRepository { }
