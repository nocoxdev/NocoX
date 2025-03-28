using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NocoX.Common.Dtos;
using NocoX.Resource.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace NocoX.Resource;

public interface IResourceAppService : IApplicationService
{
    Task<DataResult<GetResourceDto>> AddAsync(UploadResourceInput input);

    Task<DataResult<string>> GetImageBase64Async(Guid id);

    Task<GetFileDto> GetFileAsync(Guid id, string type = "file");

    Task<DataResult<GetResourceDto>> GetAsync(Guid id);

    Task<DataResult<PagedResultDto<GetResourceDto>>> GetPageListAsync(QueryPageListParamsInput input);

    Task<Result> DeleteAsync(Guid id);

    Task<DataResult<List<string>>> GetExtensionsAsync();
}
