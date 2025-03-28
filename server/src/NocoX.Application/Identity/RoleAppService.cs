using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;
using NocoX.Common.Converters;
using NocoX.Common.Dtos;
using NocoX.Identity.Dtos;
using NocoX.Localization;
using NocoX.Permissions;
using NocoX.Permissions.Dtos;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Repositories;

namespace NocoX.Identity;

public class RoleAppService(
    IRoleRepository roleRepository,
    IPermissionGrantRepository permissionGrantRepository,
    IPermissionGroupRepository permissionGroupRepository,
    RoleManager roleManager,
    IStringLocalizer<NocoXResource> localizer,
    IPermissioLocalizer permissioLocalizer
) : NocoXApplicationService, IRoleAppService
{
    public async Task<Result> CreateAsync(CreateRoleInput input)
    {
        var exist = await roleRepository.SingleOrDefaultAsync(x => x.Name == input.Name);
        if (exist != null)
        {
            throw new Exception(localizer["RoleName: {0} already exist", input.Name]);
        }

        var role = new Role(GuidGenerator.Create(), input.Name, input.Description);

        Check.NotNull(role, nameof(role));

        await roleRepository.InsertAsync(role);

        return Success();
    }

    public async Task<Result> UpdateAsync(UpdateRoleInput input)
    {
        var exist = await roleRepository.SingleOrDefaultAsync(x => x.Name == input.Name && x.Id != input.Id);
        if (exist != null)
        {
            throw new Exception(localizer["Column {0} already exist.", input.Name]);
        }

        var role = await roleRepository.GetAsync(input.Id);

        role.Name = input.Name;
        role.Description = input.Description;

        await roleRepository.UpdateAsync(role);

        return Success();
    }

    public async Task<DataResult<PagedResultDto<RoleGetDto>>> GetPageListAsync(QueryPageListParamsInput input)
    {
        var (roles, total) = await roleRepository.GetPageListAsync(
            input.PageIndex,
            input.PageSize,
            input.Filter.ToDataFilter(),
            input.Sorts.ToDataSorts(),
            input.Keywords ?? ""
        );

        var result = new PagedResultDto<RoleGetDto>
        {
            Items = ObjectMapper.Map<List<Role>, List<RoleGetDto>>(roles),
            TotalCount = total,
        };

        return DataSuccess(result);
    }

    public async Task<Result> DeleteAsync(Guid id)
    {
        await roleManager.DeleteAsync(id);

        return Success();
    }

    public async Task<DataResult<List<RoleGetDto>>> GetListAsync()
    {
        var roles = await roleRepository.GetNormalListAsync();
        return DataSuccess(ObjectMapper.Map<List<Role>, List<RoleGetDto>>(roles));
    }

    public async Task<DataResult<RoleGetDto>> GetAsync(Guid id)
    {
        var role = await roleRepository.GetAsync(id);

        return DataSuccess(ObjectMapper.Map<Role, RoleGetDto>(role));
    }

    public async Task<Result> SetPermissionsAsync(SetRolePermissionsInput input)
    {
        await roleManager.SetPermissionsAsync(input.Id, input.Permissions);

        return Success();
    }

    public async Task<DataResult<RolePermissionsGetDto>> GetPermissionsAsync(Guid id)
    {
        var permissionGrantIds = (await permissionGrantRepository.GetListAsync(x => x.RoleId == id))
            .ToList()
            .Select(x => x.PermissionId.ToString())
            .ToList();

        var permissionGroups = await permissionGroupRepository.GetResultListAsync();

        var result = new RolePermissionsGetDto
        {
            Groups = ObjectMapper.Map<List<PermissionGroupQueryItem>, List<PermissionGroupGetDto>>(
                permissioLocalizer.Localize(permissionGroups)
            ),
            Grants = permissionGrantIds,
        };

        return DataSuccess(result);
    }

    public async Task<Result> DisableAsync(Guid id)
    {
        var role = await roleRepository.GetAsync(id);

        role.SetStatus(RoleStatus.Disabled);

        await roleRepository.UpdateAsync(role);

        return Success();
    }

    public async Task<Result> EnableAsync(Guid id)
    {
        var role = await roleRepository.GetAsync(id);

        role.SetStatus(RoleStatus.Normal);

        await roleRepository.UpdateAsync(role);

        return Success();
    }
}
