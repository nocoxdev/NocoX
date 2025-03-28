using System;
using NocoX.Permissions;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace NocoX.EntityFrameworkCore.Permissions;

public class PermissionGrantRepository(IDbContextProvider<NocoXDbContext> dbContextProvider)
    : EfCoreRepository<NocoXDbContext, PermissionGrant, Guid>(dbContextProvider),
        IPermissionGrantRepository { }
