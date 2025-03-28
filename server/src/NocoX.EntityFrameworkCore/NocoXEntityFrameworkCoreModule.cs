using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NocoX.AppDatas;
using NocoX.Dapper.MySql;
using NocoX.Dapper.PostgreSQL;
using NocoX.Dapper.Sql;
using NocoX.Dapper.SQLite;
using NocoX.EntityFrameworkCore;
using NocoX.EntityFrameworkCore.Dapper.AppDatas;
using NocoX.EntityFrameworkCore.Dapper.Sql;
using NocoX.EntityFrameworkCore.Dapper.SqlServer;
using Volo.Abp.Dapper;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.PostgreSql;
using Volo.Abp.EntityFrameworkCore.SqlServer;
using Volo.Abp.Modularity;
using Volo.Abp.Uow;

namespace NocoX;

[DependsOn(
    typeof(NocoXDomainModule),
    typeof(AbpDapperModule),
    typeof(AbpEntityFrameworkCoreModule),
    typeof(AbpEntityFrameworkCorePostgreSqlModule),
    typeof(AbpEntityFrameworkCoreSqlServerModule)
)]
public class NocoXEntityFrameworkCoreModule : AbpModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        var configuration = context.Services.GetConfiguration();
        Enum.TryParse(configuration.GetValue<string>(NocoXDbProperties.DbType), out DatabaseType dbType);

        if (dbType == DatabaseType.Postgres)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }

        if (dbType == DatabaseType.SQLite)
        {
            Configure<AbpUnitOfWorkDefaultOptions>(options =>
            {
                options.TransactionBehavior = UnitOfWorkTransactionBehavior.Disabled;
            });
        }

        NocoXEfCoreEntityExtensionMappings.Configure();
    }

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        context.Services.AddAbpDbContext<NocoXDbContext>(options =>
        {
            /* Remove "includeAllEntities: true" to create
             * default repositories only for aggregate roots */
            options.AddDefaultRepositories(includeAllEntities: true);
        });

        var configuration = context.Services.GetConfiguration();
        Enum.TryParse(configuration.GetValue<string>(NocoXDbProperties.DbType), out DatabaseType dbType);

        Configure<AbpDbContextOptions>(options =>
        {
            /* The main point to change your DBMS.
             * See also NocoXMigrationsDbContextFactory for EF Core tooling. */

            switch (dbType)
            {
                case DatabaseType.Postgres:
                    options.UseNpgsql();
                    break;
                case DatabaseType.SQLite:
                    options.UseSqlite();
                    break;
                case DatabaseType.MySql:
                    options.UseMySQL();
                    break;
                default:
                    options.UseSqlServer();
                    break;
            }
        });

        switch (dbType)
        {
            case DatabaseType.Postgres:
                context.Services.AddTransient<ISqlGenerator, PostgreSQLGenerator>();
                break;
            case DatabaseType.SQLite:
                context.Services.AddTransient<ISqlGenerator, SQLiteGenerator>();
                break;
            case DatabaseType.MySql:
                context.Services.AddTransient<ISqlGenerator, MySqlGenerator>();
                break;
            default:
                context.Services.AddTransient<ISqlGenerator, SqlServerGenerator>();
                break;
        }

        context.Services.AddTransient<IAppDataRepository, AppDataDapperRepository>();
        context.Services.AddScoped<ISqlAliasManager, SqlAliasManager>();
    }
}
