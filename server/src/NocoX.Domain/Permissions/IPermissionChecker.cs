using System;
using System.Threading.Tasks;

namespace NocoX.Permissions;

public interface IPermissionChecker
{
    Task<bool> IsGrantedAsync(string GroupName, string permissionName);
}
