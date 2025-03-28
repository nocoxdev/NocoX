using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Localization;
using NocoX.Localization;
using NocoX.Permissions;
using Volo.Abp;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;

namespace NocoX.Identity;

public class RoleManager(
    IRoleRepository roleRepository,
    IRepository<UserRole, Guid> userRoleRepository,
    IPermissionGrantRepository permissionGrantRepository,
    IPermissionRepository permissionRepository,
    IConfiguration configuration,
    IStringLocalizer<NocoXResource> localizer
) : DomainService
{
    /// <summary>
    /// delete role
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    /// <exception cref="UserFriendlyException"></exception>
    public async Task DeleteAsync(Guid id)
    {
        var role = await roleRepository.GetAsync(id);
        CheckSuperRole(role);

        var userRoles = await userRoleRepository.GetListAsync(x => x.RoleId == id);

        if (userRoles.Count > 0)
        {
            throw new Exception(localizer["The role is granted users."]);
        }

        await roleRepository.DeleteAsync(id);
    }

    /// <summary>
    /// set permissions for role
    /// </summary>
    /// <param name="id"></param>
    /// <param name="permissions"></param>
    /// <returns></returns>
    public async Task SetPermissionsAsync(Guid id, Guid[] permissions)
    {
        var role = await roleRepository.GetAsync(id);

        CheckSuperRole(role);

        var permissionGrants = (await permissionRepository.GetListAsync(x => permissions.Contains(x.Id))).Select(
            x => new PermissionGrant(role.Id, x.Id)
        );

        await permissionGrantRepository.DeleteAsync(x => x.RoleId == id);

        await permissionGrantRepository.InsertManyAsync(permissionGrants);
    }

    private void CheckSuperRole(Role role)
    {
        var superRole = configuration.GetValue<string>("SuperRoleName");

        if (role.Name == superRole)
        {
            throw new Exception(localizer["The super role can not forbidden change."]);
        }
    }
}
