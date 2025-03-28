using System.Collections.Generic;

namespace NocoX.Permissions
{
    public interface IPermissioLocalizer
    {
        List<PermissionGroupQueryItem> Localize(List<PermissionGroupQueryItem> groups);
    }
}
