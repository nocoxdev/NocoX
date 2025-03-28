using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Common.Converters;
using NocoX.Common.Dtos;
using NocoX.Templates.Dtos;
using Volo.Abp.Application.Dtos;

namespace NocoX.Templates;

public class BlockAppService(IBlockRepository blockRepository) : NocoXApplicationService, IBlockAppService
{
    public async Task<Result> CreateAsync(BlockCreateInput input)
    {
        var block = new Block()
        {
            Name = input.Name,
            Cover = input.Cover,
            Tags = input.Tags.JoinAsString(" "),
            Content = input.Content,
            IsPublic = input.IsPublic,
            Description = input.Description ?? "",
        };

        await blockRepository.InsertAsync(block);

        return Success();
    }

    public async Task<Result> DeleteAsync(Guid id)
    {
        await blockRepository.DeleteAsync(id);
        return Success();
    }

    public async Task<DataResult<PagedResultDto<BlockGetDto>>> GetPageListAsync(BlockGetPageListInput input)
    {
        var (items, total) = await blockRepository.GetPageListAsync(
            input.PageIndex,
            input.PageSize,
            input.Type,
            input.Filter.ToDataFilter(),
            input.Sorts.ToDataSorts(),
            input.Keywords ?? ""
        );
        var result = new PagedResultDto<BlockGetDto>(
            totalCount: total,
            ObjectMapper.Map<List<Block>, List<BlockGetDto>>(items)
        );
        return DataSuccess(result);
    }

    public async Task<Result> UpdateAsync(BlockUpdateInput input)
    {
        var block = ObjectMapper.Map<BlockUpdateInput, Block>(input);
        await blockRepository.UpdateAsync(block);

        return Success();
    }
}
