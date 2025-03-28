using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace NocoX.DbMigrator;

[DependsOn(typeof(AbpAutofacModule), typeof(NocoXEntityFrameworkCoreModule), typeof(NocoXApplicationContractsModule))]
public class NocoXDbMigratorModule : AbpModule { }
