using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;
using NocoX.Identity;
using NocoX.Localization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Users;

namespace NocoX.Permissions;

public class PermissonChecker(
    IUserRepository userRepository,
    ICurrentUser currentUser,
    IStringLocalizer<NocoXResource> localizer
) : IPermissionChecker, ITransientDependency
{
    private readonly IUserRepository _userRepository = userRepository;

    public async Task<bool> IsGrantedAsync(string GroupName, string permissionName)
    {
        var currentUserId = currentUser.Id ?? throw new Exception(localizer["User is not exist"]);

        var grants = await _userRepository.GetPermissionGrantResultListByIdAsync(currentUserId);

        return grants.Any(x => x.GroupName == GroupName && x.PermissionName == permissionName);
    }
}
