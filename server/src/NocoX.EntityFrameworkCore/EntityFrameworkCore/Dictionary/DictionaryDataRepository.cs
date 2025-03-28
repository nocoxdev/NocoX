using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using NocoX.Dictionary;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace NocoX.EntityFrameworkCore.Dictionary;

public class DictionaryDataRepository(IDbContextProvider<NocoXDbContext> dbContextProvider)
    : EfCoreRepository<NocoXDbContext, DictionaryData, Guid>(dbContextProvider),
        IDictionaryDataRepository
{
    public virtual async Task<DictionaryData> GetIncludeChildrenAsync(Guid id)
    {
        var datas = await (await GetQueryableAsync()).ToListAsync();

        var data =
            datas.SingleOrDefault(x => x.Id == id) ?? throw new EntityNotFoundException(typeof(DictionaryData), id);

        var children = FindChildren(datas, id);

        data.SetChildren(children);

        return data;
    }

    public virtual async Task<List<DictionaryData>> GetChildrenAsync(Guid parentId)
    {
        var datas = await (await GetQueryableAsync()).ToListAsync();

        var result = FindChildren(datas, parentId).OrderByDescending(x => x.Order).ToList();

        return result;
    }

    public virtual async Task<(List<DictionaryData> items, int total)> GetPageListAsync(
        int pageIndex,
        int pageSize,
        Guid groupId,
        string keywords,
        bool includeChildren = false
    )
    {
        var queryable = includeChildren
            ? (await GetListIncludeChildrenAsync(null)).AsQueryable()
            : (await GetQueryableAsync());

        var newQueryable = (await GetQueryableAsync())
            .Where(x => x.ParentId == null && x.GroupId == groupId)
            .WhereIf(!string.IsNullOrWhiteSpace(keywords), x => x.Title.Contains(keywords) || x.Name.Contains(keywords))
            .OrderBy(x => x.Order);

        var result = await newQueryable.TakePage(pageIndex, pageSize).ToListAsync();
        var total = await newQueryable.CountAsync();
        return (result, total);
    }

    public async Task<List<DictionaryData>> GetListAsync(Guid groupId, string keywords, bool includeChildren)
    {
        var queryable = includeChildren
            ? (await GetListIncludeChildrenAsync(null)).AsQueryable()
            : (await GetQueryableAsync());

        return queryable
            .Where(x => x.Enabled)
            .Where(x => x.GroupId == groupId)
            .WhereIf(!string.IsNullOrWhiteSpace(keywords), x => x.Title.Contains(keywords) || x.Name.Contains(keywords))
            .OrderBy(x => x.Order)
            .ToList();
    }

    private async Task<List<DictionaryData>> GetListIncludeChildrenAsync(Guid? parentId)
    {
        var datas = await (await GetQueryableAsync()).ToListAsync();

        return FindChildren(datas, parentId);
    }

    private static List<DictionaryData> FindChildren(List<DictionaryData> datas, Guid? parentId)
    {
        var result = datas
            .Where(b => b.ParentId == parentId)
            .Select(b =>
            {
                var children = FindChildren(datas, b.Id);

                if (children != null && children.Count > 0)
                {
                    b.SetChildren(children);
                }

                return b;
            });

        return result.ToList();
    }
}
