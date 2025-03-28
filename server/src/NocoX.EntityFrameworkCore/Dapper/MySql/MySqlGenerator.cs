using NocoX.EntityFrameworkCore.Dapper.Sql;
using Volo.Abp.DependencyInjection;

namespace NocoX.Dapper.MySql;

public class MySqlGenerator : SqlGeneratorBase, ITransientDependency
{
    public override char OpenQuote
    {
        get { return '`'; }
    }

    public override char CloseQuote
    {
        get { return '`'; }
    }
}
