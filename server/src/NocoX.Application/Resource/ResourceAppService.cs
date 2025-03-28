using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using NocoX.Common.Converters;
using NocoX.Common.Dtos;
using NocoX.Resource.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.BlobStoring;

namespace NocoX.Resource;

public class ResourceAppService(IBlobContainer<ResourceContainer> blobContainer, IResourceRepository resourceRepository)
    : NocoXApplicationService,
        IResourceAppService
{
    public async Task<DataResult<GetResourceDto>> AddAsync(UploadResourceInput input)
    {
        var descriptor = new ResourceDescriptor(
            GuidGenerator.Create(),
            input.Name,
            ResourceType.Image,
            input.Extension
        );

        await resourceRepository.InsertAsync(descriptor);
        await blobContainer.SaveAsync(descriptor.Id.ToString(), input.File);
        var result = new GetResourceDto { Id = descriptor.Id.ToString(), Name = descriptor.Name };

        return DataSuccess(result);
    }

    public async Task<DataResult<string>> GetImageBase64Async(Guid id)
    {
        var descriptor = await resourceRepository.GetAsync(id);

        var stream = await blobContainer.GetAsync(id.ToString());
        using MemoryStream memoryStream = new();
        stream.CopyTo(memoryStream);

        byte[] byteArray = memoryStream.ToArray();

        return DataSuccess($"data:image/{descriptor.Extension};base64,{Convert.ToBase64String(byteArray)}");
    }

    public async Task<Result> DeleteAsync(Guid id)
    {
        await resourceRepository.DeleteAsync(id);
        await blobContainer.DeleteAsync(id.ToString());

        return Success();
    }

    public async Task<DataResult<PagedResultDto<GetResourceDto>>> GetPageListAsync(QueryPageListParamsInput input)
    {
        var (items, total) = await resourceRepository.GetPageListAsync(
            input.PageIndex,
            input.PageSize,
            input.Filter.ToDataFilter(),
            input.Sorts.ToDataSorts(),
            input.Keywords ?? ""
        );

        var result = new PagedResultDto<GetResourceDto>(
            total,
            ObjectMapper.Map<List<ResourceDescriptorQueryItem>, List<GetResourceDto>>(items)
        );
        return DataSuccess(result);
    }

    public async Task<GetFileDto> GetFileAsync(Guid id, string type = "file")
    {
        var descriptor = await resourceRepository.GetAsync(id);
        var stream = await blobContainer.GetAsync(id.ToString());

        using MemoryStream memoryStream = new();
        stream.CopyTo(memoryStream);

        byte[] byteArray = memoryStream.ToArray();

        var result = new GetFileDto
        {
            Bytes = byteArray,
            Name = descriptor.Name,
            ContentType = descriptor.Extension == "svg" ? $"image/svg+xml" : $"{type}/{descriptor.Extension}",
        };

        return result;
    }

    public async Task<DataResult<List<string>>> GetExtensionsAsync()
    {
        var extensions = await resourceRepository.GetExtensionsAsync();
        return DataSuccess(extensions);
    }

    public async Task<DataResult<GetResourceDto>> GetAsync(Guid id)
    {
        var descriptor = await resourceRepository.GetAsync(id);

        var result = ObjectMapper.Map<ResourceDescriptor, GetResourceDto>(descriptor);
        return DataSuccess(result);
    }
}
