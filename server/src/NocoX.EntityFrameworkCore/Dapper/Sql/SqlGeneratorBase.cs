using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Dapper;
using NocoX.Common;
using NocoX.Database;

namespace NocoX.EntityFrameworkCore.Dapper.Sql;

public interface ISqlGenerator
{
    char OpenQuote { get; }

    char CloseQuote { get; }

    char ParameterPrefix { get; }

    string EmptyEquation { get; }

    string GetTableName(string schema, string tableName, string alias = "");

    string GetColumnName(string prefix, string columnName, string alias = "");

    bool IsQuoted(string value);

    string QuoteString(string value);

    string GetCountSql(string querySql);

    (string sql, DynamicParameters parameters) GetInsertSqlAndParams(
        string schema,
        string tableName,
        string tableAlias,
        Dictionary<string, object?> data
    );

    (string sql, DynamicParameters parameters) GetUpdateSqlAndParams(
        string schema,
        string tableName,
        string tableAlias,
        Guid id,
        Dictionary<string, object?> data
    );

    (string sql, DynamicParameters parameters) GetPagingSqlAndParams(int pageIndex, int pageSize);

    (string sql, DynamicParameters parameters) GetWhereSqlAndParams(
        string tableAlias,
        string? keywords,
        DataFilter? filterInfo,
        List<ColumnInfo> columns,
        Dictionary<string, string> relatedTableAlias,
        bool showDeleted = false
    );

    (string sql, DynamicParameters parameters) ConvertFilter2WhereClause(
        string tableAlias,
        DataFilter filter,
        List<ColumnInfo> columns,
        Dictionary<string, string> relatedTableAlias
    );

    string ConvertSorts2OrderClause(string tableAlias, List<DataSort> sorts);

    string GetQuerySql(string schema, string tableName, string tableAlias, List<string>? columns = null);

    string GetOrderSql(string tableAlias, List<DataSort>? sorts);

    string GetLeftJoinSql(
        string schema,
        string leftTableAlias,
        string rightTableName,
        string rightTableAlias,
        string leftRelatedColumnName
    );

    string GetColumnsSql(string tableAlias, List<ColumnInfo>? selectRightColumns = null);

    string GetExcludeDeletedSql(string tableAlias);
}

public abstract class SqlGeneratorBase : ISqlGenerator
{
    public virtual char OpenQuote
    {
        get { return '"'; }
    }

    public virtual char CloseQuote
    {
        get { return '"'; }
    }

    public virtual char ParameterPrefix
    {
        get { return '@'; }
    }

    public virtual string EmptyEquation
    {
        get { return "1=1"; }
    }

    public virtual (string sql, DynamicParameters parameters) GetWhereSqlAndParams(
        string tableAlias,
        string? keywords,
        DataFilter? filterInfo,
        List<ColumnInfo> columns,
        Dictionary<string, string> relatedTableAlias,
        bool showDeleted = false
    )
    {
        var sb = new StringBuilder();
        var parameters = new DynamicParameters();

        sb.Append($" WHERE {EmptyEquation}");

        if (columns.HasIsDeleted() && showDeleted == false)
        {
            sb.Append($" AND {GetExcludeDeletedSql(tableAlias)}");
        }

        if (!string.IsNullOrWhiteSpace(keywords))
        {
            sb.Append(" AND (");

            sb.AppendJoin(
                columns,
                (_sb, col) => _sb.Append($"{GetColumnName(tableAlias, col.Name)} LIKE {ParameterPrefix}keywords"),
                " OR "
            );

            parameters.Add("keywords", $"%{keywords}%");
            sb.Append(')');
        }

        if (filterInfo != null && filterInfo.Conditions.Count > 0)
        {
            var (whereSql, whereParameters) = ConvertFilter2WhereClause(
                tableAlias,
                filterInfo,
                columns,
                relatedTableAlias
            );

            sb.Append(" AND (");
            sb.Append(whereSql);
            sb.Append(')');

            parameters.AddDynamicParams(whereParameters);
        }

        return (sb.ToString(), parameters);
    }

    public virtual string GetOrderSql(string tableAlias, List<DataSort>? sorts)
    {
        if (sorts == null || sorts.Count == 0)
        {
            return string.Empty;
        }

        var sb = new StringBuilder();

        sb.Append(" ORDER BY ");

        sb.Append(ConvertSorts2OrderClause(tableAlias, sorts));

        return sb.ToString();
    }

    public virtual (string sql, DynamicParameters parameters) GetPagingSqlAndParams(int pageIndex, int pageSize)
    {
        var parameters = new DynamicParameters();
        var skips = ((pageIndex == 0 ? 1 : pageIndex) - 1) * pageSize;

        var result = " LIMIT @pageSize OFFSET @skips";

        parameters.Add("pageSize", pageSize);
        parameters.Add("skips", skips);

        return (result, parameters);
    }

    public virtual (string sql, DynamicParameters parameters) GetInsertSqlAndParams(
        string schema,
        string tableName,
        string tableAlias,
        Dictionary<string, object?> data
    )
    {
        var colSb = new StringBuilder();
        var valueSb = new StringBuilder();
        var parameters = new DynamicParameters();

        colSb.Append($"INSERT INTO {GetTableName(schema, tableName)} (");
        valueSb.Append("VALUES (");

        foreach (var item in data)
        {
            colSb.Append($"{GetColumnName(tableAlias, item.Key)}, ");
            valueSb.Append($"{ParameterPrefix}{item.Key}, ");
            parameters.Add(item.Key, item.Value);
        }

        colSb.Length -= 2;
        valueSb.Length -= 2;

        colSb.Append(") ");
        valueSb.Append(')');

        var sb = new StringBuilder();
        sb.Append(colSb);
        sb.Append(valueSb);

        return (sb.ToString(), parameters);
    }

    public virtual (string sql, DynamicParameters parameters) GetUpdateSqlAndParams(
        string schema,
        string tableName,
        string tableAlias,
        Guid id,
        Dictionary<string, object?> data
    )
    {
        var sb = new StringBuilder();
        var parameters = new DynamicParameters();

        sb.Append($"UPDATE {GetTableName(schema, tableName)} SET ");

        foreach (var item in data)
        {
            sb.Append($"{GetColumnName(tableAlias, item.Key)} = {ParameterPrefix}{item.Key}, ");
            parameters.Add(item.Key, item.Value);
        }

        sb.Length -= 2;
        sb.Append($" WHERE {GetColumnName(tableAlias, TableSystemColumns.Id.ColumnName)} = {ParameterPrefix}id");
        parameters.Add("id", id);

        return (sb.ToString(), parameters);
    }

    public virtual string GetTableName(string schema, string tableName, string alias = "")
    {
        var sb = new StringBuilder();

        if (!string.IsNullOrWhiteSpace(schema))
        {
            sb.Append($"{QuoteString(schema)}.");
        }

        sb.Append($"{QuoteString(tableName)}");

        if (!string.IsNullOrWhiteSpace(alias))
        {
            sb.Append($" AS {QuoteString(alias)}");
        }

        return sb.ToString();
    }

    public virtual string GetColumnName(string prefix, string columnName, string alias = "")
    {
        var sb = new StringBuilder();

        if (!string.IsNullOrWhiteSpace(prefix))
        {
            sb.Append($"{QuoteString(prefix)}.");
        }

        sb.Append($"{QuoteString(columnName)}");

        if (!string.IsNullOrWhiteSpace(alias))
        {
            sb.Append($" AS {QuoteString(alias)}");
        }

        return sb.ToString();
    }

    public virtual string QuoteString(string value)
    {
        if (IsQuoted(value) || value == "*")
        {
            return value;
        }
        return $"{OpenQuote}{value.Trim()}{CloseQuote}";
    }

    public virtual bool IsQuoted(string value)
    {
        if (value.Trim()[0] == OpenQuote)
        {
            return value.Trim().Last() == CloseQuote;
        }

        return false;
    }

    public virtual (string sql, DynamicParameters parameters) ConvertFilter2WhereClause(
        string tableAlias,
        DataFilter filter,
        List<ColumnInfo> columns,
        Dictionary<string, string> relatedTableAlias
    )
    {
        var conjunction = filter.Conjunction == DataFilterConjunction.And ? " AND " : " OR ";

        var sb = new StringBuilder();
        var parameters = new DynamicParameters();

        for (var i = 0; i < filter.Conditions.Count; i++)
        {
            var condition = filter.Conditions[i];
            var paramName = $"{condition.Name}{i}";

            var column = columns.FirstOrDefault(x => x.Name == condition.Name);

            var left = column.UiType switch
            {
                UiType.CreatedBy => GetColumnName(relatedTableAlias[column.Name], "UserName"),
                UiType.LastModifiedBy => GetColumnName(relatedTableAlias[column.Name], "UserName"),
                UiType.DeletedBy => GetColumnName(relatedTableAlias[column.Name], "UserName"),
                UiType.Relation => GetColumnName(relatedTableAlias[column.Name], column.Relation.DisplayColumnName),
                _ => GetColumnName(tableAlias, condition.Name),
            };

            var right = $"{ParameterPrefix}{paramName}";

            parameters.Add(paramName, condition.Value);

            var equation = condition.Operator switch
            {
                DataFilterOperator.Equal => $"{left}={right}",
                DataFilterOperator.NotEqual => $"{left}!={right}",
                DataFilterOperator.GreaterThan => $"{left}>{right}",
                DataFilterOperator.GreaterThanEqual => $"{left} >= {right}",
                DataFilterOperator.LessThan => $"{left}<{right}",
                DataFilterOperator.LessThanEqual => $"{left}<={right}",
                DataFilterOperator.StartWith => $"{left} LIKE {right}%",
                DataFilterOperator.EndWith => $"{left} LIKE %{right}",
                DataFilterOperator.Contain => $"{left} LIKE %{right}%",
                DataFilterOperator.NotContain => $"{left} NOT LIKE %{right}%",
                _ => throw new ArgumentOutOfRangeException(condition.Operator.ToString()),
            };

            sb.Append(equation);
            sb.Append(conjunction);
        }

        sb.Length -= conjunction.Length;

        return (sb.ToString(), parameters);
    }

    public virtual string ConvertSorts2OrderClause(string tableAlias, List<DataSort> sorts)
    {
        var sb = new StringBuilder();

        sb.AppendJoin(
            sorts,
            (_sb, sort) =>
            {
                var order = sort.Order == SortOrder.Ascending ? "ASC" : "DESC";

                _sb.Append($"{GetColumnName(tableAlias, sort.FieldName)} {order}");
            }
        );

        return sb.ToString();
    }

    public virtual string GetQuerySql(string schema, string tableName, string tableAlias, List<string>? columns = null)
    {
        var sb = new StringBuilder();
        sb.Append("SELECT ");

        if (columns != null && columns.Count > 0)
        {
            sb.AppendJoin(columns, (_sb, col) => _sb.Append(col));
        }
        else
        {
            sb.Append('*');
        }

        sb.Append($" FROM {GetTableName(schema, tableName)}");

        return sb.ToString();
    }

    public virtual string GetCountSql(string querySql)
    {
        return $"SELECT COUNT(*) AS {QuoteString("Total")} {querySql}";
    }

    public virtual string GetExcludeDeletedSql(string tableAlias)
    {
        return $"({GetColumnName(tableAlias, TableSystemColumns.IsDeleted.ColumnName)}!=1  OR {GetColumnName(tableAlias, TableSystemColumns.IsDeleted.ColumnName)} IS NULL)";
    }

    public virtual string GetLeftJoinSql(
        string schema,
        string leftTableAlias,
        string rightTableName,
        string rightTableAlias,
        string leftRelatedColumnName
    )
    {
        return $" LEFT JOIN {GetTableName(schema, rightTableName, rightTableAlias)} ON {GetColumnName(leftTableAlias, leftRelatedColumnName)}={GetColumnName(rightTableAlias, TableSystemColumns.Id.ColumnName)}";
    }

    public virtual string GetColumnsSql(string tableAlias, List<ColumnInfo>? columns = null)
    {
        string columnsSql = "*";
        if (columns != null && columns.Count > 0)
        {
            columnsSql = string.Join(
                ", ",
                columns.Select(c =>
                {
                    var sql = $"{QuoteString(tableAlias)}.{QuoteString(c.Name)}";
                    return string.IsNullOrWhiteSpace(c.Alias) ? sql : $"{sql} AS {QuoteString(c.Alias)}";
                })
            );
        }

        return columnsSql;
    }
}
