using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using NocoX.Common;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace NocoX.EntityFrameworkCore.Common;

public class CanOrderRepository<TDbContext, TEntity>(IDbContextProvider<TDbContext> dbContextProvider)
    : EfCoreRepository<TDbContext, TEntity, Guid>(dbContextProvider),
        ICanOrderRepository<TEntity>
    where TDbContext : IEfCoreDbContext
    where TEntity : class, IEntity<Guid>, IHasOrder
{
    public async Task ReorderAsync(
        Expression<Func<TEntity, bool>>? predicate,
        Guid id,
        int toIndex,
        Guid? toParentId = null
    )
    {
        if (toIndex < 0)
        {
            throw new ArgumentOutOfRangeException($"{nameof(toIndex)}:{toIndex} out of range.");
        }

        var queryable = await GetQueryableByPredicateAsync(predicate);

        var entity = await GetAsync(id);

        if (typeof(IHasParentId).IsAssignableFrom(typeof(TEntity)))
        {
            var fromEntities = queryable.Where(x =>
                ((IHasParentId)x).ParentId == ((IHasParentId)entity).ParentId && x.Order > entity.Order
            );

            foreach (var item in fromEntities)
            {
                item.Order -= 1;
            }

            var toEntities = queryable.Where(x => ((IHasParentId)x).ParentId == toParentId && x.Order >= toIndex);
            foreach (var item in toEntities)
            {
                item.Order += 1;
            }

            entity.Order = toIndex;
            ((IHasParentId)entity).ParentId = toParentId;
        }
        else
        {
            var fromEntities = queryable.Where(x => x.Order > entity.Order);

            foreach (var item in fromEntities)
            {
                item.Order -= 1;
            }

            var toEntities = queryable.Where(x => x.Order >= toIndex);
            foreach (var item in toEntities)
            {
                item.Order += 1;
            }

            entity.Order = toIndex;
        }
    }

    public async Task DeleteWithReorderAsync(Expression<Func<TEntity, bool>>? predicate, Guid id)
    {
        var queryable = await GetQueryableByPredicateAsync(predicate);

        var entity = await GetAsync(id);

        await DeleteAsync(entity);

        var entities = queryable.Where(x => x.Order > entity.Order);

        foreach (var item in entities)
        {
            item.Order--;
        }

        await (await GetDbContextAsync()).SaveChangesAsync();
    }

    public async Task<int> GetMaxOrderAsync(Expression<Func<TEntity, bool>>? predicate, Guid? parentId)
    {
        var queryable = await GetQueryableByPredicateAsync(predicate);

        if (typeof(IHasParentId).IsAssignableFrom(typeof(TEntity)))
        {
            return queryable.Where(x => ((IHasParentId)x).ParentId == parentId).Max(x => (int?)x.Order) ?? -1;
        }
        else
        {
            return queryable.Max(x => (int?)x.Order) ?? -1;
        }
    }

    private async Task<IQueryable<TEntity>> GetQueryableByPredicateAsync(Expression<Func<TEntity, bool>>? predicate)
    {
        return predicate != null ? (await GetQueryableAsync()).Where(predicate) : await GetQueryableAsync();
    }
}
