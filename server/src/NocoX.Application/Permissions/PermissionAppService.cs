using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Common.Dtos;
using NocoX.Permissions.Dtos;

namespace NocoX.Permissions;

public class PermissionAppService(IPermissionGroupRepository permissionGroupRepository, IPermissioLocalizer permissioLocalize)
    : NocoXApplicationService,
        IPermissionAppService
{
    public async Task<DataResult<List<PermissionGroupGetDto>>> GetListAsync()
    {
        var permissionGroups = await permissionGroupRepository.GetResultListAsync();

        var localizedPermissions = permissioLocalize.Localize(permissionGroups);

        var result = ObjectMapper.Map<List<PermissionGroupQueryItem>, List<PermissionGroupGetDto>>(localizedPermissions);

        return DataSuccess(result);
    }
}
