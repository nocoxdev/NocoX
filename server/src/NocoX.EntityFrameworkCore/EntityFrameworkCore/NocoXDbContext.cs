using System;
using System.Threading.Tasks;
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
using Volo.Abp.EntityFrameworkCore;

namespace NocoX.EntityFrameworkCore;

public partial class NocoXDbContext(DbContextOptions<NocoXDbContext> options) : AbpDbContext<NocoXDbContext>(options)
{
    /* Add DbSet properties for your Aggregate Roots / Entities here. */

    #region Entities from the modules

    /* Notice: We only implemented IIdentityDbContext and ITenantManagementDbContext
     * and replaced them for this DbContext. This allows you to perform JOIN
     * queries for the entities of these modules over the repositories easily. You
     * typically don't need that for other modules. But, if you need, you can
     * implement the DbContext interface of the needed module and use ReplaceDbContext
     * attribute just like IIdentityDbContext and ITenantManagementDbContext.
     *
     * More info: Replacing a DbContext of a module ensures that the related module
     * uses this DbContext on runtime. Otherwise, it will use its own DbContext class.
     */

    public DbSet<User> Users { get; set; }

    public DbSet<Role> Roles { get; set; }

    public DbSet<UserRole> UserRoles { get; set; }

    public DbSet<App> Apps { get; set; }

    public DbSet<AppPage> Pages { get; set; }

    public DbSet<AppPageContent> PageContent { get; set; }

    public DbSet<AppHistory> AppHistory { get; set; }

    public DbSet<Table> Tables { get; set; }

    public DbSet<TableRelationship> TableRelation { get; set; }

    public DbSet<TableColumn> TableColumns { get; set; }

    public DbSet<AppDataRecord> AppDataRecord { get; set; }

    public DbSet<AppRole> AppRoles { get; set; }

    public DbSet<AppRelease> AppReleases { get; set; }

    public DbSet<Block> Blocks { get; set; }

    public DbSet<Workspace> Workspaces { get; set; }

    public DbSet<WorkspaceMember> WorkspaceMembers { get; set; }

    public DbSet<RefreshToken> RefreshToken { get; set; }

    public DbSet<ResourceDescriptor> ReourceDescriptor { get; set; }

    public DbSet<Permission> Permission { get; set; }

    public DbSet<PermissionGrant> PermissionGrant { get; set; }

    public DbSet<PermissionGroup> PermissionGroup { get; set; }

    public DbSet<DictionaryData> DictionaryData { get; set; }

    public DbSet<DictionaryGroup> DictionaryGroup { get; set; }

    #endregion

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.ConfigureNocoX();
    }
}
