using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using NocoX.Account;
using NocoX.Identity;
using NocoX.Permissions;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Guids;
using Volo.Abp.Uow;

namespace NocoX;

public class NocoXDataSeedContributor(
    IGuidGenerator guidGenerator,
    IPermissionGroupRepository permissionGroupRepository,
    IPermissionRepository permissionRepository,
    IUserRepository userRepository,
    IRepository<UserRole, Guid> userRoleRepository,
    IRoleRepository roleRepository,
    IPermissionGrantRepository permissionGrantRepository,
    IUnitOfWorkManager unitOfWorkManager,
    IConfiguration configuration
) : IDataSeedContributor, ITransientDependency
{
    public async Task SeedAsync(DataSeedContext context)
    {
        await AddPermissions();
        await AddDefaultRoleAndAdmiAsync();
    }

    public async Task AddPermissions()
    {
        using (var uow = unitOfWorkManager.Begin(requiresNew: true, isTransactional: false))
        {
            if (await permissionGroupRepository.CountAsync() > 0)
            {
                return;
            }

            var (myAppsGroup, myAppsPermissions) = CreatePermissions(MyAppsPermissions.GetPermissionDefinition(), 0);
            var (accountGroup, accountPermissions) = CreatePermissions(AccountPermissions.GetPermissionDefinition(), 1);
            var (resourceGroup, resourcePermissions) = CreatePermissions(
                ResourcePermissions.GetPermissionDefinition(),
                2
            );
            var (workspaceGroup, workspacePermissions) = CreatePermissions(
                WorkspacePermissions.GetPermissionDefinition(),
                3
            );

            var (userGroup, userPermissions) = CreatePermissions(SettingUserPermissions.GetPermissionDefinition(), 4);
            var (roleGroup, rolePermissions) = CreatePermissions(SettingRolePermissions.GetPermissionDefinition(), 5);
            var (appGroup, appPermissions) = CreatePermissions(ReleaseAppPermissions.GetPermissionDefinition(), 6);

            var (databaseGroup, databasePermissions) = CreatePermissions(
                DatabasePermissions.GetPermissionDefinition(),
                7
            );
            var (dictGroup, dictPermissions) = CreatePermissions(DictionaryPermissions.GetPermissionDefinition(), 8);

            var groups = new List<PermissionGroup>
            {
                myAppsGroup,
                userGroup,
                roleGroup,
                appGroup,
                databaseGroup,
                workspaceGroup,
                dictGroup,
                accountGroup,
                resourceGroup,
            };

            var permissions = new List<Permission>(
                [
                    .. myAppsPermissions,
                    .. userPermissions,
                    .. rolePermissions,
                    .. appPermissions,
                    .. workspacePermissions,
                    .. databasePermissions,
                    .. dictPermissions,
                    .. accountPermissions,
                    .. resourcePermissions,
                ]
            );

            await permissionGroupRepository.InsertManyAsync(groups);
            await permissionRepository.InsertManyAsync(permissions);

            await uow.CompleteAsync();
        }
    }

    [UnitOfWork]
    public async Task AddDefaultRoleAndAdmiAsync()
    {
        using (var uow = unitOfWorkManager.Begin(requiresNew: true, isTransactional: false))
        {
            if (await roleRepository.CountAsync() > 0 || await userRepository.CountAsync() > 0)
            {
                return;
            }

            var superRoleName = configuration.GetValue<string>("SuperRoleName");

            // add superAdmin role and admin
            var superAdminRole = new Role(guidGenerator.Create(), superRoleName, "");
            await roleRepository.InsertAsync(superAdminRole);
            var permissions = await permissionRepository.GetListAsync();
            var grants = permissions.Select(x => new PermissionGrant(superAdminRole.Id, x.Id)).ToList();
            await permissionGrantRepository.InsertManyAsync(grants);

            var superAdminName = configuration.GetValue<string>("SuperAdminName");
            var superAdminPassword = configuration.GetValue<string>("SuperAdminPassword");
            var md5 = ComputedMD5(superAdminPassword);

            var admin = new User(
                guidGenerator.Create(),
                superAdminName,
                "admin@nocox.net",
                Password.Encypt(md5),
                "1888888888"
            );
            admin.SetEmailConfirmed(true);
            await userRepository.InsertAsync(admin);

            await userRoleRepository.InsertAsync(new UserRole(admin.Id, superAdminRole.Id));

            // add allUser role and user

            var allUserRole = new Role(guidGenerator.Create(), "AllUser", "");
            await roleRepository.InsertAsync(allUserRole);

            var allUserPermissionGroups = await permissionGroupRepository.GetListAsync(x =>
                x.Name == AccountPermissions.GroupName
                || x.Name == ResourcePermissions.GroupName
                || x.Name == MyAppsPermissions.GroupName
            );

            var allUserPermissionsGroupIds = allUserPermissionGroups.Select(x => x.Id);

            var allUserPermissions = await permissionRepository.GetListAsync(x =>
                allUserPermissionsGroupIds.Contains(x.GroupId)
            );
            var allUserGrants = allUserPermissions.Select(x => new PermissionGrant(allUserRole.Id, x.Id)).ToList();

            await permissionGrantRepository.InsertManyAsync(allUserGrants);

            var user = new User(guidGenerator.Create(), "Tom", "user@nocox.net", Password.Encypt(md5), "1888888888");
            user.SetEmailConfirmed(true);
            await userRepository.InsertAsync(user);

            await userRoleRepository.InsertAsync(new UserRole(user.Id, allUserRole.Id));

            await uow.CompleteAsync();
        }
    }

    private (PermissionGroup group, List<Permission> permissions) CreatePermissions(
        PermissionGroupDefinition definition,
        int order
    )
    {
        var group = new PermissionGroup(guidGenerator.Create(), definition.Name, order);

        var index = 0;

        var permissions = definition.Permissions.Select(x => new Permission(
            guidGenerator.Create(),
            group.Id,
            x.Name,
            x.Description,
            index++,
            x.Type
        ));

        return (group, permissions.ToList());
    }

    private static string ComputedMD5(string input)
    {
        byte[] inputBytes = Encoding.UTF8.GetBytes(input);
        byte[] hashBytes = MD5.HashData(inputBytes);
        return Convert.ToHexStringLower(hashBytes);
    }
}
