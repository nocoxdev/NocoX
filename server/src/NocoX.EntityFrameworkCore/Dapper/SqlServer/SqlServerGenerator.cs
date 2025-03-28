using Dapper;
using NocoX.EntityFrameworkCore.Dapper.Sql;
using Volo.Abp.DependencyInjection;

namespace NocoX.EntityFrameworkCore.Dapper.SqlServer;

public class SqlServerGenerator : SqlGeneratorBase, ITransientDependency
{
    public override char OpenQuote
    {
        get { return '['; }
    }

    public override char CloseQuote
    {
        get { return ']'; }
    }

    public override (string sql, DynamicParameters parameters) GetPagingSqlAndParams(int pageIndex, int pageSize)
    {
        var parameters = new DynamicParameters();
        var skips = ((pageIndex == 0 ? 1 : pageIndex) - 1) * pageSize;

        var result = $" OFFSET {ParameterPrefix}skips ROWS FETCH NEXT {ParameterPrefix}pageSize ROWS ONLY";

        parameters.Add("skips", skips);
        parameters.Add("pageSize", pageSize);

        return (result, parameters);
    }
}
