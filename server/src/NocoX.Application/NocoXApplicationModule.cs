using Volo.Abp.Application;
using Volo.Abp.AutoMapper;
using Volo.Abp.Modularity;

namespace NocoX;

[DependsOn(
    typeof(NocoXDomainModule),
    typeof(AbpDddApplicationModule),
    typeof(NocoXApplicationContractsModule),
    typeof(AbpAutoMapperModule)
)]
public class NocoXApplicationModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpAutoMapperOptions>(options =>
        {
            options.AddMaps<NocoXApplicationModule>();
        });
    }
}
