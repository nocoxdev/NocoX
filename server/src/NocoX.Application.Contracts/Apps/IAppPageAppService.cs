using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Apps.Dtos;
using NocoX.Common.Dtos;
using Volo.Abp.Application.Services;

namespace NocoX.Apps;

public interface IAppPageAppService : IApplicationService
{
    Task<Result> UpdateAsync(UpdatePageInput input);

    Task<Result> UpdateContentAsync(UpdatePageContentInput input);

    Task<Result> DeleteAsync(Guid id);

    Task<DataResult<List<PageGetDto>>> GetListAsync(Guid pageId);

    Task<Result> Reorder(ReorderInput input);

    Task<DataResult<PageGetDto>> AddAsync(AddPageInput input);

    Task<Result> EnableAsync(Guid id);

    Task<Result> DisableAsync(Guid id);
}
