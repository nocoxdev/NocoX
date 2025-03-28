using Microsoft.Extensions.DependencyInjection;
using NocoX.Permissions;
using Volo.Abp.BlobStoring;
using Volo.Abp.Domain;
using Volo.Abp.Modularity;
using Volo.Abp.Security;

namespace NocoX;

[DependsOn(
    typeof(NocoXDomainSharedModule),
    typeof(AbpDddDomainModule),
    typeof(AbpSecurityModule),
    typeof(AbpBlobStoringModule)
)]
public class NocoXDomainModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        context.Services.AddTransient<IPermissionChecker, PermissonChecker>();
        context.Services.AddTransient<IPermissioLocalizer, PermissioLocalizer>();
    }
}
