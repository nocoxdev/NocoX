using System;
using Dapper;
using NocoX.EntityFrameworkCore.Dapper.Sql;
using Volo.Abp.DependencyInjection;

namespace NocoX.Dapper.SQLite;

public class SQLiteGenerator : SqlGeneratorBase, ITransientDependency
{
    public virtual char OpenQuote
    {
        get { return '"'; }
    }

    public virtual char CloseQuote
    {
        get { return '"'; }
    }
}
