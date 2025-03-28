using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Common.Dtos;
using NocoX.Dictionary.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace NocoX.Dictionary;

public interface IDictionaryGroupAppService : IApplicationService
{
    Task<DataResult<PagedResultDto<DictionaryGroupGetDto>>> GetPageListAsync(PageListInput input);

    Task<DataResult<List<DictionaryGroupGetDto>>> GetListAsync(QueryKeywordsInput input);

    Task<Result> CreateAsync(CreateDictionaryGroupInput input);

    Task<Result> UpdateAsync(UpdateDictionaryGroupInput input);

    Task<Result> DeleteAsync(Guid id);
}
