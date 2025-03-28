using System.Collections.Generic;
using Volo.Abp.DependencyInjection;

namespace NocoX.EntityFrameworkCore.Dapper.Sql;

public interface ISqlAliasManager
{
    string GenerateTableAlias(string name);
}

public class SqlAliasManager : ISqlAliasManager, IScopedDependency
{
    private readonly Dictionary<char, int> _aliases = [];

    public virtual string GenerateTableAlias(string name)
    {
        var firstChar = char.ToLowerInvariant(name[0]);

        if (_aliases.TryGetValue(firstChar, out var counter))
        {
            _aliases[firstChar] = counter + 1;

            return $"{firstChar}{counter}";
        }
        else
        {
            _aliases[firstChar] = 0;
            return firstChar.ToString();
        }
    }
}
