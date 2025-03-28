using System.Threading.Tasks;

namespace NocoX.Data;

public interface INocoXDbSchemaMigrator
{
    Task MigrateAsync();
}
