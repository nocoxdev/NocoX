using Volo.Abp.Application;
using Volo.Abp.Modularity;
using Volo.Abp.ObjectExtending;

namespace NocoX;

[DependsOn(typeof(NocoXDomainSharedModule), typeof(AbpDddApplicationContractsModule), typeof(AbpObjectExtendingModule))]
public class NocoXApplicationContractsModule : AbpModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        NocoXDtoExtensions.Configure();
    }
}
