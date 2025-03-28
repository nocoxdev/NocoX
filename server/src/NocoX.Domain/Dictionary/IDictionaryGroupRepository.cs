using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace NocoX.Dictionary;

public interface IDictionaryGroupRepository : IRepository<DictionaryGroup, Guid>
{
    Task<(List<DictionaryGroup> items, int total)> GetPageListAsync(int pageIndex, int pageSize, string keywords);
}
