using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace NocoX.Data;

public class NullNocoXDbSchemaMigrator : INocoXDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
