using System;
using System.Data;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Localization;
using NocoX.Account;
using NocoX.Localization;
using Volo.Abp;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;

namespace NocoX.Identity;

public class UserManager(
    IUserRepository userRepository,
    IRepository<UserRole, Guid> userRoleRepository,
    IConfiguration configuration,
    IStringLocalizer<NocoXResource> localizer
) : IDomainService
{
    /// <summary>
    /// update password
    /// </summary>
    /// <param name="user"></param>
    /// <param name="password"></param>
    /// <returns></returns>
    /// <exception cref="Exception"></exception>
    public async Task UpdatePasswordAsync(
        [NotNull] User user,
        [NotNull] string password,
        [NotNull] string confirmPassword
    )
    {
        Check.NotNullOrWhiteSpace(password, nameof(password));
        Check.NotNullOrWhiteSpace(confirmPassword, nameof(confirmPassword));

        Check.NotNull(user, nameof(user));

        if (password != confirmPassword)
        {
            throw new Exception(localizer["Password and ConfirmPassword is not equal"]);
        }
        var passwordHash = Password.Encypt(password);

        user.SetNewPassword(passwordHash);
        user.SetLastPasswordChangeTime(DateTime.Now);

        await userRepository.UpdateAsync(user);
    }

    /// <summary>
    /// create user
    /// </summary>
    /// <param name="user"></param>
    /// <returns></returns>
    public async Task CreateAsync([NotNull] User user, Guid[] roleIds)
    {
        Check.NotNull(user, nameof(user));

        var userRoles = roleIds.Select(x => new UserRole(user.Id, x));

        user.Status = UserStatus.Normal;

        await userRoleRepository.InsertManyAsync(userRoles);
        await userRepository.InsertAsync(user);
    }

    public async Task UpdateAsync([NotNull] User user, Guid[] roleIds)
    {
        Check.NotNull(user, nameof(user));

        CheckSuperAdmin(user);
        var userRoles = roleIds.Select(x => new UserRole(user.Id, x));

        await userRoleRepository.DeleteAsync(x => x.UserId == user.Id);
        await userRoleRepository.InsertManyAsync(userRoles);
        await userRepository.UpdateAsync(user);
    }

    public async Task DeleteAsync([NotNull] User user)
    {
        Check.NotNull(user, nameof(user));

        CheckSuperAdmin(user);

         await userRoleRepository.DeleteAsync(x => x.UserId == user.Id);
        await userRepository.DeleteAsync(user);
    }


    private void CheckSuperAdmin(User user)
    {
        var superAdminName = configuration.GetValue<string>("SuperUserName");

        if (user.UserName == superAdminName)
        {
            throw new Exception(localizer["The super admin can be forbidden chagne."]);
        }
    }
}
