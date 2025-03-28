using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace NocoX;

[Dependency(ReplaceServices = true)]
public class NocoXBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "NocoX";
}
