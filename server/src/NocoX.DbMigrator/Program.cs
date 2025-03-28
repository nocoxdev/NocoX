using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Events;

namespace NocoX.DbMigrator;

class Program
{
    static async Task Main(string[] args)
    {
        Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Information()
            .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
            .MinimumLevel.Override("Volo.Abp", LogEventLevel.Warning)
#if DEBUG
            .MinimumLevel.Override("NocoX", LogEventLevel.Debug)
#else
            .MinimumLevel.Override("NocoX", LogEventLevel.Information)
#endif
            .Enrich.FromLogContext()
            .WriteTo.Async(c => c.File("Logs/logs.txt", rollingInterval: RollingInterval.Hour))
            .WriteTo.Async(c => c.Console())
            .CreateLogger();

        await CreateHostBuilder(args).RunConsoleAsync();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .AddAppSettingsSecretsJson()
            .ConfigureLogging((context, logging) => logging.ClearProviders())
            .ConfigureServices(
                (hostContext, services) =>
                {
                    services.AddHostedService<DbMigratorHostedService>();
                }
            );
}
