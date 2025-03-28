using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using NocoX.AppDatas;
using NocoX.Common;
using NocoX.Database;
using NocoX.EntityFrameworkCore.Dapper.Sql;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories.Dapper;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.Users;

namespace NocoX.EntityFrameworkCore.Dapper.AppDatas;

public class AppDataDapperRepository(
    IDbContextProvider<NocoXDbContext> dbContextProvider,
    ICurrentUser currentUser,
    ISqlAliasManager sqlAliasManager,
    ISqlGenerator sqlGenerator
) : DapperRepository<NocoXDbContext>(dbContextProvider), IAppDataRepository, ITransientDependency
{
    private readonly Dictionary<string, string> _relatedTableAlias = [];

    public virtual async Task DeleteAysnc(string tableName, Guid id, List<ColumnInfo> columns)
    {
        var connection = await GetDbConnectionAsync();

        if (columns.HasIsDeleted())
        {
            var data = new Dictionary<string, object?>
            {
                { TableSystemColumns.IsDeleted.ColumnName, true }
            };

            if (columns.HasDeletedTime())
            {
                data.Add(TableSystemColumns.DeletedTime.ColumnName, DateTime.Now);
            }

            if (columns.HasDeletedBy() && currentUser.Id.HasValue)
            {
                data.Add(TableSystemColumns.DeletedBy.ColumnName, currentUser.Id);
            }

            var (sql, parameters) = sqlGenerator.GetUpdateSqlAndParams("", tableName, "", id, data);

            await connection.ExecuteAsync(sql, parameters, await GetDbTransactionAsync());
        }
        else
        {
            await connection.ExecuteAsync(
                $"DELETE FROM {sqlGenerator.GetTableName("", tableName, "")} WHERE {sqlGenerator.GetColumnName("", TableSystemColumns.Id.ColumnName)} = @id",
                new { id },
                await GetDbTransactionAsync()
            );
        }
    }

    public virtual async Task<object?> GetByIdAsync(string tableName, Guid id, List<ColumnInfo> columns)
    {
        var sb = new StringBuilder();

        var parameters = new DynamicParameters();
        sb.Append("SELECT ");
        var tableAlias = sqlAliasManager.GenerateTableAlias(tableName);

        var (columnsSql, querySql) = GetQuerySql(
            tableName,
            tableAlias,
            null,
            null,
            null,
            columns,
            parameters,
            false,
            $"{sqlGenerator.GetColumnName(tableAlias, TableSystemColumns.Id.ColumnName)}=@id"
        );

        parameters.Add("id", id);

        sb.Append(columnsSql);
        sb.Append(querySql);

        var connection = await GetDbConnectionAsync();
        return await connection.QuerySingleOrDefaultAsync<object>(
            sb.ToString(),
            parameters,
            await GetDbTransactionAsync()
        );
    }

    public virtual async Task<object?> GetByUserAsync(string tableName, Guid userId, List<ColumnInfo> columns)
    {
        if (!columns.HasCreatedBy())
        {
            return null;
        }

        var sb = new StringBuilder();

        var parameters = new DynamicParameters();
        sb.Append("SELECT ");
        var tableAlias = sqlAliasManager.GenerateTableAlias(tableName);

        var (columnsSql, querySql) = GetQuerySql(
            tableName,
            tableAlias,
            null,
            null,
            null,
            columns,
            parameters,
            false,
            $"{sqlGenerator.GetColumnName(tableAlias, TableSystemColumns.CreatedBy.ColumnName)}=@userId"
        );
        parameters.Add("userId", userId);

        sb.Append(columnsSql);
        sb.Append(querySql);

        var connection = await GetDbConnectionAsync();
        return await connection.QuerySingleOrDefaultAsync<object>(
            sb.ToString(),
            parameters,
            await GetDbTransactionAsync()
        );
    }

    public virtual async Task<int> GetCountAsync(
        string tableName,
        string keywords,
        DataFilter? filter,
        List<ColumnInfo> columns
    )
    {
        var parameters = new DynamicParameters();

        var tableAlias = sqlAliasManager.GenerateTableAlias(tableName);
        var (_, querySql) = GetQuerySql(
            tableName,
            tableAlias,
            keywords,
            null,
            filter,
            columns,
            parameters,
            false,
            null
        );

        var sql = sqlGenerator.GetCountSql(querySql);

        var connection = await GetDbConnectionAsync();
        return await connection.ExecuteScalarAsync<int>(sql, parameters, await GetDbTransactionAsync());
    }

    public virtual async Task<List<object>> GetListAsync(
        string tableName,
        string keywords,
        DataFilter? filter,
        List<DataSort>? sorts,
        List<ColumnInfo> columns
    )
    {
        var connection = await GetDbConnectionAsync();
        var sb = new StringBuilder();
        var parameters = new DynamicParameters();
        sb.Append("SELECT ");

        var tableAlias = sqlAliasManager.GenerateTableAlias(tableName);

        var (columnsSql, querySql) = GetQuerySql(
            tableName,
            tableAlias,
            keywords,
            null,
            filter,
            columns,
            parameters,
            true,
            null
        );

        sb.Append(columnsSql);
        sb.Append(querySql);

        var orderSql = sqlGenerator.GetOrderSql(tableAlias, sorts);

        sb.Append(
            orderSql == string.Empty
                ? $" ORDER BY {sqlGenerator.GetColumnName(tableAlias, TableSystemColumns.Id.ColumnName)} DESC"
                : orderSql
        );

        var result = await connection.QueryAsync<object>(sb.ToString(), parameters, await GetDbTransactionAsync());

        return [.. result];
    }

    public virtual async Task<(List<object> items, int total)> GetPageListAsync(
        string tableName,
        int pageIndex,
        int pageSize,
        string keywords,
        DataFilter? filter,
        List<DataSort>? sorts,
        List<ColumnInfo> columns
    )
    {
        string tableAlias = sqlAliasManager.GenerateTableAlias("l");

        var parameters = new DynamicParameters();
        var sb = new StringBuilder();
        var (columnsSql, querySql) = GetQuerySql(
            tableName,
            tableAlias,
            keywords,
            null,
            filter,
            columns,
            parameters,
            false,
            null
        );

        sb.Append("SELECT ");
        sb.Append(columnsSql);
        sb.Append(querySql);

        var orderSql = sqlGenerator.GetOrderSql(tableAlias, sorts);

        sb.Append(
            orderSql == string.Empty
                ? $" ORDER BY {sqlGenerator.GetColumnName(tableAlias, TableSystemColumns.Id.ColumnName)} DESC"
                : orderSql
        );

        // Before paging query, get the total number of records
        var connection = await GetDbConnectionAsync();

        var countSql = sqlGenerator.GetCountSql(querySql);
        var total = await connection.ExecuteScalarAsync<int>(countSql, parameters, await GetDbTransactionAsync());

        var (pagingSql, pagingParameters) = sqlGenerator.GetPagingSqlAndParams(pageIndex, pageSize);

        sb.Append(pagingSql);
        parameters.AddDynamicParams(pagingParameters);

        var items = await connection.QueryAsync<object>(sb.ToString(), parameters, await GetDbTransactionAsync());

        return (items.ToList(), total);
    }

    public virtual async Task InsertAsync(string tableName, Dictionary<string, object?> data, List<ColumnInfo> columns)
    {
        if (columns.HasCreatedBy() && currentUser.Id.HasValue)
        {
            data.Add(TableSystemColumns.CreatedBy.ColumnName, currentUser.Id);
        }

        if (columns.HasCreatedTime())
        {
            data.Add(TableSystemColumns.CreationTime.ColumnName, DateTime.Now);
        }

        if (columns.HasIsDeleted())
        {
            data.Add(TableSystemColumns.IsDeleted.ColumnName, false);
        }

        var (sql, parameters) = sqlGenerator.GetInsertSqlAndParams("", tableName, "", data);

        var connection = await GetDbConnectionAsync();
        await connection.ExecuteAsync(sql, parameters, await GetDbTransactionAsync());
    }

    public virtual async Task UpdateAsync(
        string tableName,
        Guid id,
        Dictionary<string, object?> data,
        List<ColumnInfo> columns
    )
    {
        if (columns.HasLastModifiedBy() && currentUser.Id.HasValue)
        {
            data.Add(TableSystemColumns.LastModifiedBy.ColumnName, currentUser.Id);
        }

        if (columns.HasLastModifiedTime())
        {
            data.Add(TableSystemColumns.LastModifiedTime.ColumnName, DateTime.Now);
        }

        var (sql, parameters) = sqlGenerator.GetUpdateSqlAndParams("", tableName, "", id, data);

        var connection = await GetDbConnectionAsync();
        await connection.ExecuteAsync(sql, parameters, await GetDbTransactionAsync());
    }

    private (string columnsSql, string joinSql) GetAuditedUserSql(string leftTableAlias, List<ColumnInfo> columns)
    {
        var columnsSql = new List<string>();
        var joinSqlSb = new StringBuilder();

        var dbUserTableName = $"{NocoXDbProperties.DbTablePrefix}User";

        if (columns.HasCreatedBy())
        {
            var selectColumns = new List<ColumnInfo>
            {
                new() { Name = "UserName", Alias = "CreatedName" },
            };

            var createdUserTableAlias = sqlAliasManager.GenerateTableAlias("U");

            _relatedTableAlias.Add(TableSystemColumns.CreatedBy.ColumnName, createdUserTableAlias);

            joinSqlSb.Append(
                sqlGenerator.GetLeftJoinSql(
                    "",
                    leftTableAlias,
                    dbUserTableName,
                    createdUserTableAlias,
                    TableSystemColumns.CreatedBy.ColumnName
                )
            );

            columnsSql.Add(sqlGenerator.GetColumnsSql(createdUserTableAlias, selectColumns));
        }

        if (columns.HasLastModifiedBy())
        {
            var selectColumns = new List<ColumnInfo>
            {
                new() { Name = "UserName", Alias = "LastModifiedName" },
            };

            var lastModifiedUserTableAlias = sqlAliasManager.GenerateTableAlias("U");

            _relatedTableAlias.Add(TableSystemColumns.LastModifiedBy.ColumnName, lastModifiedUserTableAlias);

            joinSqlSb.Append(
                sqlGenerator.GetLeftJoinSql(
                    "",
                    leftTableAlias,
                    dbUserTableName,
                    lastModifiedUserTableAlias,
                    TableSystemColumns.LastModifiedBy.ColumnName
                )
            );

            columnsSql.Add(sqlGenerator.GetColumnsSql(lastModifiedUserTableAlias, selectColumns));
        }

        if (columns.HasDeletedBy())
        {
            var selectColumns = new List<ColumnInfo>
            {
                new() { Name = "UserName", Alias = "DeletedName" },
            };

            var deletionUserTableAlias = sqlAliasManager.GenerateTableAlias("U");

            _relatedTableAlias.Add(TableSystemColumns.DeletedBy.ColumnName, deletionUserTableAlias);

            joinSqlSb.Append(
                sqlGenerator.GetLeftJoinSql(
                    "",
                    leftTableAlias,
                    dbUserTableName,
                    deletionUserTableAlias,
                    TableSystemColumns.DeletedBy.ColumnName
                )
            );

            columnsSql.Add(sqlGenerator.GetColumnsSql(deletionUserTableAlias, selectColumns));
        }

        return (columnsSql.JoinAsString(", "), joinSqlSb.ToString());
    }

    private (string columnsSql, string joinSql) GetRelationColumnSql(string leftTableAlias, List<ColumnInfo> columns)
    {
        var columnsSql = new List<string>();
        var joinSqlSb = new StringBuilder();
        foreach (var column in columns)
        {
            if (
                column.UiType == UiType.Relation
                && column.Relation != null
                && column.Relation.TableName != null
                && column.Relation.DisplayColumnName != null
            )
            {
                var selectColumns = new List<ColumnInfo>
                {
                    new()
                    {
                        Name = column.Relation.DisplayColumnName,
                        Alias = $"{column.Relation.TableName}{column.Relation.DisplayColumnName}",
                    },
                };
                var relatedTableAlias = sqlAliasManager.GenerateTableAlias("R");

                _relatedTableAlias.Add(column.Name, relatedTableAlias);

                joinSqlSb.Append(
                    sqlGenerator.GetLeftJoinSql(
                        "",
                        leftTableAlias,
                        column.Relation.TableName,
                        relatedTableAlias,
                        column.Name
                    )
                );
                columnsSql.Add(sqlGenerator.GetColumnsSql(relatedTableAlias, selectColumns));
            }
        }
        return (columnsSql.JoinAsString(", "), joinSqlSb.ToString());
    }

    private (string columnsSql, string querySql) GetQuerySql(
        string tableName,
        string tableAlias,
        string? keywords,
        List<string>? queryColumns,
        DataFilter? filter,
        List<ColumnInfo> columns,
        DynamicParameters parameters,
        bool showDeleted,
        string? extraWhereSql
    )
    {
        var columnsSb = new StringBuilder();

        var querySb = new StringBuilder();

        var (columnsSql, joinSql) = GetAuditedUserSql(tableAlias, columns);

        var (relationColumnsSql, relationJoinSql) = GetRelationColumnSql(tableAlias, columns);

        if (queryColumns == null || queryColumns.Count == 0)
        {
            columnsSb.Append($"{sqlGenerator.QuoteString(tableAlias)}.*");
        }
        else
        {
            columnsSb.Append(
                sqlGenerator.GetColumnsSql(tableAlias, queryColumns.Select(x => new ColumnInfo { Name = x }).ToList())
            );
        }

        if (!string.IsNullOrWhiteSpace(columnsSql))
        {
            columnsSb.Append(", ");
            columnsSb.Append(columnsSql);
        }

        if (!string.IsNullOrWhiteSpace(relationColumnsSql))
        {
            columnsSb.Append(", ");
            columnsSb.Append(relationColumnsSql);
        }

        querySb.Append($" FROM {sqlGenerator.GetTableName("", tableName, tableAlias)}");

        querySb.Append(joinSql);

        querySb.Append(relationJoinSql);

        var (whereSql, whereParameters) = sqlGenerator.GetWhereSqlAndParams(
            tableAlias,
            keywords,
            filter,
            columns,
            _relatedTableAlias,
            showDeleted
        );
        querySb.Append(whereSql);

        if (!string.IsNullOrWhiteSpace(extraWhereSql))
        {
            querySb.Append(" AND ");
            querySb.Append(extraWhereSql);
        }

        parameters.AddDynamicParams(whereParameters);

        return (columnsSb.ToString(), querySb.ToString());
    }
}
