using System;
using Volo.Abp.Domain.Repositories;

namespace NocoX.Permissions;

public interface IPermissionRepository : IRepository<Permission, Guid> { }
