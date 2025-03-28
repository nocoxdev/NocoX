using System;
using Volo.Abp.Domain.Repositories;

namespace NocoX.Permissions;

public interface IPermissionGrantRepository : IRepository<PermissionGrant, Guid> { }
