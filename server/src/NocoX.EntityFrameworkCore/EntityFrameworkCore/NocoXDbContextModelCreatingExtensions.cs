using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using NocoX.Account;
using NocoX.AppDatas;
using NocoX.Apps;
using NocoX.Database;
using NocoX.Dictionary;
using NocoX.Identity;
using NocoX.Permissions;
using NocoX.Resource;
using NocoX.Templates;
using NocoX.Workspaces;
using Volo.Abp;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace NocoX.EntityFrameworkCore;

public static class NocoXDbContextModelCreatingExtensions
{
    public static void ConfigureNocoX([NotNull] this ModelBuilder builder)
    {
        Check.NotNull(builder, nameof(builder));

        builder.Entity<User>(b =>
        {
            b.ToTable(NocoXDbProperties.DbTablePrefix + "User");
            b.HasIndex(u => u.UserName);
            b.HasIndex(u => u.Email);
            b.ConfigureByConvention();
        });

        builder.Entity<UserRole>(b =>
        {
            b.ToTable(NocoXDbProperties.DbTablePrefix + "UserRole");
            b.ConfigureByConvention();
        });

        builder.Entity<Role>(b =>
        {
            b.ToTable(NocoXDbProperties.DbTablePrefix + "Role");
            b.ConfigureByConvention();
        });

        builder.Entity<Permission>(b =>
        {
            b.ToTable(NocoXDbProperties.DbTablePrefix + "Permission");
            b.HasIndex(p => p.Name);
            b.ConfigureByConvention();
        });

        builder.Entity<PermissionGrant>(b =>
        {
            b.ToTable(NocoXDbProperties.DbTablePrefix + "PermissionGrant");
            b.ConfigureByConvention();
        });

        builder.Entity<PermissionGroup>(b =>
        {
            b.ToTable(NocoXDbProperties.DbTablePrefix + "PermissionGroup");
            b.HasIndex(p => p.Name);
            b.ConfigureByConvention();
        });

        builder.Entity<App>(b =>
        {
            b.ToTable(NocoXDbProperties.DbTablePrefix + "App");
            b.HasIndex(app => app.Title);
            b.ConfigureByConvention();
        });

        builder.Entity<AppPage>(b =>
        {
            b.ToTable(NocoXDbProperties.DbTablePrefix + "AppPage");
            b.HasIndex(p => p.Path);
            b.ConfigureByConvention();
        });

        builder.Entity<AppPageContent>(b =>
        {
            b.ToTable(NocoXDbProperties.DbTablePrefix + "AppPageContent");
            b.ConfigureByConvention();
        });

        builder.Entity<AppHistory>(b =>
        {
            b.ToTable(NocoXDbProperties.DbTablePrefix + "AppHistory");
            b.ConfigureByConvention();
        });

        builder.Entity<AppRole>(b =>
        {
            b.ToTable(NocoXDbProperties.DbTablePrefix + "AppRole");
            b.ConfigureByConvention();
        });

        builder.Entity<AppRelease>(b =>
        {
            b.ToTable(NocoXDbProperties.DbTablePrefix + "AppRelease");
            b.ConfigureByConvention();
        });

        builder.Entity<Block>(b =>
        {
            b.ToTable(NocoXDbProperties.DbTablePrefix + "Block");
            b.HasIndex(block => block.Name);
            b.ConfigureByConvention();
        });

        builder.Entity<Workspace>(b =>
        {
            b.ToTable(NocoXDbProperties.DbTablePrefix + "Workspace");
            b.HasIndex(w => w.Title);
            b.ConfigureByConvention();
        });

        builder.Entity<WorkspaceMember>(b =>
        {
            b.ToTable(NocoXDbProperties.DbTablePrefix + "WorkspaceMember");
            b.ConfigureByConvention();
        });

        builder.Entity<RefreshToken>(b =>
        {
            b.ToTable(NocoXDbProperties.DbTablePrefix + "RefreshToken");
            b.HasIndex(t => t.UserName);
            b.ConfigureByConvention();
        });

        builder.Entity<ResourceDescriptor>(b =>
        {
            b.ToTable(NocoXDbProperties.DbTablePrefix + "Resource");
            b.HasIndex(t => t.Name);
            b.ConfigureByConvention();
        });

        builder.Entity<Table>(b =>
        {
            b.ToTable(NocoXDbProperties.DbTablePrefix + "Table");
            b.HasIndex(t => t.TableName);
            b.ConfigureByConvention();
        });

        builder.Entity<TableColumn>(b =>
        {
            b.ToTable(NocoXDbProperties.DbTablePrefix + "TableColumn");
            b.HasIndex(t => t.ColumnName);
            b.ConfigureByConvention();
        });

        builder.Entity<TableRelationship>(b =>
        {
            b.ToTable(NocoXDbProperties.DbTablePrefix + "TableRelationship");
            b.ConfigureByConvention();
        });

        builder.Entity<AppDataRecord>(b =>
        {
            b.ToTable(NocoXDbProperties.DbTablePrefix + "AppDataRecord");
            b.ConfigureByConvention();
        });

        builder.Entity<DictionaryData>(b =>
        {
            b.ToTable(NocoXDbProperties.DbTablePrefix + "DictionaryData");
            b.ConfigureByConvention();
        });

        builder.Entity<DictionaryGroup>(b =>
        {
            b.ToTable(NocoXDbProperties.DbTablePrefix + "DictionaryGroup");
            b.ConfigureByConvention();
        });
    }
}
