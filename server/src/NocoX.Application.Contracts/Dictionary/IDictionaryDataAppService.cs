using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Common.Dtos;
using NocoX.Dictionary.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace NocoX.Dictionary;

public interface IDictionaryDataAppService : IApplicationService
{
    Task<DictionaryDataGetDto> GetAsync(Guid id);

    Task<DataResult<PagedResultDto<DictionaryDataGetDto>>> GetPageListAsync(DictionaryDataGetPageListInput input);

    Task<DataResult<List<DictionaryDataGetDto>>> GetListAsync(DictionaryDataGetListInput input);

    Task<DataResult<List<DictionaryDataGetDto>>> GetChildrenAsync(Guid groupId);

    Task<Result> AddAsync(AddDictionaryDataInput input);

    Task<Result> UpdateAsync(UpdateDictionaryDataInput input);

    Task<Result> DeleteAsync(Guid id);

    Task<Result> EnableAsync(Guid id);

    Task<Result> DisableAsync(Guid id);
}
