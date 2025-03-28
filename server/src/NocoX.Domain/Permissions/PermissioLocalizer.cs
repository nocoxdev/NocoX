using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Localization;
using NocoX.Localization;
using Volo.Abp.DependencyInjection;

namespace NocoX.Permissions;

public class PermissioLocalizer(IStringLocalizer<NocoXResource> localizer) : IPermissioLocalizer, ITransientDependency
{
    public List<PermissionGroupQueryItem> Localize(List<PermissionGroupQueryItem> groups)
    {
        return
        [
            .. groups.Select(x => new PermissionGroupQueryItem
            {
                Id = x.Id,
                Name = localizer[x.Name],
                Permissions =
                [
                    .. x.Permissions.Select(y => new PermissionQueryItem
                    {
                        Id = y.Id,
                        Name = localizer[y.Name],
                        Description = localizer[y.Description],
                        Type = y.Type,
                        Order = y.Order
                    }),
                ],
            }),
        ];
    }
}
