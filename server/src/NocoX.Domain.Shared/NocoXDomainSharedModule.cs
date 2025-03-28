using NocoX.Localization;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Volo.Abp.VirtualFileSystem;

namespace NocoX;

[DependsOn(typeof(AbpLocalizationModule))]
public class NocoXDomainSharedModule : AbpModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        NocoXGlobalFeatureConfigurator.Configure();
        NocoXModuleExtensionConfigurator.Configure();
    }

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpVirtualFileSystemOptions>(options =>
        {
            options.FileSets.AddEmbedded<NocoXDomainSharedModule>("NocoX");
        });

        Configure<AbpLocalizationOptions>(options =>
        {
            options.Resources.Add<NocoXResource>("en-US").AddVirtualJson("/Localization");
        });
    }
}
