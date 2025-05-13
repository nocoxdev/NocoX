using NocoX.Database;
using NocoX.EntityFrameworkCore.Dapper.Sql;
using Volo.Abp.DependencyInjection;

namespace NocoX.Dapper.PostgreSQL;

public class PostgreSQLGenerator : SqlGeneratorBase, ITransientDependency
{
    public override string GetExcludeDeletedSql(string tableAlias)
    {
        return $"({GetColumnName(tableAlias, TableSystemColumns.IsDeleted.ColumnName)}!=TRUE OR {GetColumnName(tableAlias, TableSystemColumns.IsDeleted.ColumnName)} IS NULL)";
    }
}
