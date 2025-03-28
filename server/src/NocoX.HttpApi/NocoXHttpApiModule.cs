using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Modularity;

namespace NocoX;

[DependsOn(typeof(NocoXApplicationContractsModule), typeof(AbpAspNetCoreMvcModule))]
public class NocoXHttpApiModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context) { }
}
