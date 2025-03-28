using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Common.Dtos;
using NocoX.Dictionary.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Repositories;

namespace NocoX.Dictionary;

public class DictionaryDataAppService(IDictionaryDataRepository dictionaryDataRepository)
    : NocoXApplicationService,
        IDictionaryDataAppService
{
    public async Task<Result> EnableAsync(Guid id)
    {
        var data = await dictionaryDataRepository.GetAsync(id);

        data.Enabled = true;
        await dictionaryDataRepository.UpdateAsync(data);

        return Success();
    }

    public async Task<Result> DisableAsync(Guid id)
    {
        var data = await dictionaryDataRepository.GetAsync(id);

        data.Enabled = false;
        await dictionaryDataRepository.UpdateAsync(data);

        return Success();
    }

    public async Task<Result> AddAsync(AddDictionaryDataInput input)
    {
        var parent = await dictionaryDataRepository.SingleOrDefaultAsync(x => x.Id == input.ParentId);

        var data = new DictionaryData(
            input.GroupId,
            parent?.Id,
            input.Name,
            input.Title,
            input.Description ?? "",
            input.Order,
            input.Enabled
        );
        await dictionaryDataRepository.InsertAsync(data);

        return Success();
    }

    public async Task<Result> UpdateAsync(UpdateDictionaryDataInput input)
    {
        var data = await dictionaryDataRepository.GetAsync(input.Id);

        data.Name = input.Name;
        data.Title = input.Title;
        data.Description = input.Description ?? "";
        data.Order = input.Order;
        data.Enabled = input.Enabled;

        await dictionaryDataRepository.UpdateAsync(data);
        return Success();
    }

    public async Task<Result> DeleteAsync(Guid id)
    {
        await dictionaryDataRepository.DeleteAsync(id);
        return Success();
    }

    public async Task<DictionaryDataGetDto> GetAsync(Guid id)
    {
        var data = await dictionaryDataRepository.GetAsync(id);
        return ObjectMapper.Map<DictionaryData, DictionaryDataGetDto>(data);
    }

    public async Task<DataResult<List<DictionaryDataGetDto>>> GetChildrenAsync(Guid parentId)
    {
        var items = await dictionaryDataRepository.GetChildrenAsync(parentId);
        var dtos = ObjectMapper.Map<List<DictionaryData>, List<DictionaryDataGetDto>>(items);

        return DataSuccess(dtos);
    }

    public async Task<DataResult<PagedResultDto<DictionaryDataGetDto>>> GetPageListAsync(
        DictionaryDataGetPageListInput input
    )
    {
        var (items, total) = await dictionaryDataRepository.GetPageListAsync(
            input.PageIndex,
            input.PageSize,
            input.GroupId,
            input.Keywords ?? "",
            true
        );

        var result = new PagedResultDto<DictionaryDataGetDto>(
            total,
            ObjectMapper.Map<List<DictionaryData>, List<DictionaryDataGetDto>>(items)
        );

        return DataSuccess(result);
    }

    public async Task<DataResult<List<DictionaryDataGetDto>>> GetListAsync(DictionaryDataGetListInput input)
    {
        var items = await dictionaryDataRepository.GetListAsync(
            input.GroupId,
            input.Keywords ?? "",
            input.IncludeChildren
        );
        var dtos = ObjectMapper.Map<List<DictionaryData>, List<DictionaryDataGetDto>>(items);
        return DataSuccess(dtos);
    }
}
