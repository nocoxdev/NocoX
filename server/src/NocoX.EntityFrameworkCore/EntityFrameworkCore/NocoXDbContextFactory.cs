using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using NocoX.Dapper.Sql;

namespace NocoX.EntityFrameworkCore;

/* This class is needed for EF Core console commands
 * (like Add-Migration and Update-Database commands) */
public class NocoXDbContextFactory : IDesignTimeDbContextFactory<NocoXDbContext>
{
    public NocoXDbContext CreateDbContext(string[] args)
    {
        var configuration = BuildConfiguration();
        Enum.TryParse(configuration.GetValue<string>(NocoXDbProperties.DbType), out DatabaseType dbType);
        var connectionString = configuration.GetConnectionString(NocoXDbProperties.ConnectionStringName);

        switch (dbType)
        {
            case DatabaseType.Postgres:
            {
                AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
                NocoXEfCoreEntityExtensionMappings.Configure();

                var builder = new DbContextOptionsBuilder<NocoXDbContext>().UseNpgsql(connectionString);
                return new NocoXDbContext(builder.Options);
            }
            case DatabaseType.SQLite:
            {
                NocoXEfCoreEntityExtensionMappings.Configure();

                var builder = new DbContextOptionsBuilder<NocoXDbContext>().UseSqlite(connectionString);

                return new NocoXDbContext(builder.Options);
            }
            case DatabaseType.MySql:
            {
                NocoXEfCoreEntityExtensionMappings.Configure();

                var builder = new DbContextOptionsBuilder<NocoXDbContext>().UseMySql(
                    connectionString,
                    ServerVersion.AutoDetect(connectionString)
                );

                return new NocoXDbContext(builder.Options);
            }
            default:
            {
                NocoXEfCoreEntityExtensionMappings.Configure();

                var builder = new DbContextOptionsBuilder<NocoXDbContext>().UseSqlServer(connectionString);

                return new NocoXDbContext(builder.Options);
            }
        }
    }

    private static IConfigurationRoot BuildConfiguration()
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../NocoX.DbMigrator/"))
            .AddJsonFile("appsettings.json", optional: false);

        return builder.Build();
    }
}
