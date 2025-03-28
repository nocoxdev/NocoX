using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Common.Dtos;
using NocoX.Dictionary.Dtos;
using Volo.Abp.Application.Dtos;

namespace NocoX.Dictionary;

public class DictionaryGroupAppService(IDictionaryGroupRepository groupRepository)
    : NocoXApplicationService,
        IDictionaryGroupAppService
{
    public async Task<Result> CreateAsync(CreateDictionaryGroupInput input)
    {
        var data = new DictionaryGroup(input.Title, input.Description ?? "");

        await groupRepository.InsertAsync(data);
        return Success();
    }

    public async Task<Result> DeleteAsync(Guid id)
    {
        await groupRepository.DeleteAsync(id);
        return Success();
    }

    public async Task<Result> UpdateAsync(UpdateDictionaryGroupInput input)
    {
        var data = await groupRepository.GetAsync(input.Id);

        data.Title = input.Title;
        data.Description = input.Description ?? "";

        await groupRepository.UpdateAsync(data);
        return Success();
    }

    public async Task<DataResult<PagedResultDto<DictionaryGroupGetDto>>> GetPageListAsync(PageListInput input)
    {
        var (items, total) = await groupRepository.GetPageListAsync(
            input.PageIndex,
            input.PageSize,
            input.Keywords ?? ""
        );

        var result = new PagedResultDto<DictionaryGroupGetDto>(
            total,
            ObjectMapper.Map<List<DictionaryGroup>, List<DictionaryGroupGetDto>>(items)
        );

        return DataSuccess(result);
    }

    public async Task<DataResult<List<DictionaryGroupGetDto>>> GetListAsync(QueryKeywordsInput input)
    {
        var keywords = input.Keywords ?? "";

        var items = await groupRepository.GetListAsync(x => x.Title.Contains(keywords));

        var dtos = ObjectMapper.Map<List<DictionaryGroup>, List<DictionaryGroupGetDto>>(items);
        return DataSuccess(dtos);
    }
}
