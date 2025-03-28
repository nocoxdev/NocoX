using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;

namespace NocoX.Common;

public interface ICanOrderRepository<TEntity> : IRepository<TEntity, Guid>
    where TEntity : class, IEntity<Guid>
{
    Task ReorderAsync(Expression<Func<TEntity, bool>>? predicate, Guid id, int toIndex, Guid? toParentId);

    Task DeleteWithReorderAsync(Expression<Func<TEntity, bool>>? predicate, Guid id);

    Task<int> GetMaxOrderAsync(Expression<Func<TEntity, bool>>? predicate, Guid? parentId);
}
