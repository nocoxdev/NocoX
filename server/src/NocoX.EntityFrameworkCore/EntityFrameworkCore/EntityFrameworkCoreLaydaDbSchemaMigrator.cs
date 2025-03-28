using System;
using System.Threading.Tasks;
using NocoX.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.DependencyInjection;

namespace NocoX.EntityFrameworkCore;

public class EntityFrameworkCoreNocoXDbSchemaMigrator(IServiceProvider serviceProvider)
    : INocoXDbSchemaMigrator,
        ITransientDependency
{
    private readonly IServiceProvider _serviceProvider = serviceProvider;

    public async Task MigrateAsync()
    {
        /* We intentionally resolving the LayDbTableOperationContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await _serviceProvider.GetRequiredService<NocoXDbContext>().Database.MigrateAsync();
    }
}
