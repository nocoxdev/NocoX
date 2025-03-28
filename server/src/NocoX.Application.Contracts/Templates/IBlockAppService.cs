using System;
using System.Threading.Tasks;
using NocoX.Common.Dtos;
using NocoX.Templates.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace NocoX.Templates;

public interface IBlockAppService : IApplicationService
{
    Task<Result> CreateAsync(BlockCreateInput input);

    Task<Result> UpdateAsync(BlockUpdateInput input);

    Task<Result> DeleteAsync(Guid id);

    Task<DataResult<PagedResultDto<BlockGetDto>>> GetPageListAsync(BlockGetPageListInput input);
}
