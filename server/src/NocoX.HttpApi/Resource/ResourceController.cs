using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NocoX.Common.Dtos;
using NocoX.Permissions;
using NocoX.Resource.Dtos;
using NocoX.Resource.Models;
using Volo.Abp.Application.Dtos;

namespace NocoX.Resource;

[ApiController]
[Authorize]
[PermissionGroup(ResourcePermissions.GroupName)]
public class ResourceController(IResourceAppService resourceAppService) : NocoXController
{
    [HttpPost]
    [Route("api/resource/upload")]
    [Permission(ResourcePermissions.Upload)]
    public Task<DataResult<GetResourceDto>> Upload([FromForm] ResourceModel resource)
    {
        var fileBytes = resource.File.GetAllBytesAsync();
        var dto = new UploadResourceInput
        {
            File = fileBytes.Result,
            Name = resource.File.FileName,
            Extension = Path.GetExtension(resource.File.FileName).TrimStart('.'),
            Type = resource.Type,
        };
        return resourceAppService.AddAsync(dto);
    }

    [HttpPost]
    [Route("api/resource/delete")]
    [Permission(ResourcePermissions.Delete)]
    public Task<Result> Delete([FromBody] OnlyIdInput input)
    {
        return resourceAppService.DeleteAsync(input.Id);
    }

    [HttpPost]
    [Route("api/resource/getPageList")]
    [Permission(ResourcePermissions.View)]
    public Task<DataResult<PagedResultDto<GetResourceDto>>> GetPageList([FromBody] QueryPageListParamsInput input)
    {
        return resourceAppService.GetPageListAsync(input);
    }

    [HttpGet]
    [Route("image/base64/{id}")]
    [AllowAnonymous]
    public Task<DataResult<string>> GetImageBase64(Guid id)
    {
        return resourceAppService.GetImageBase64Async(id);
    }

    [HttpGet]
    [Route("resource/{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetFile(Guid id)
    {
        var result = await resourceAppService.GetFileAsync(id);

        return File(result.Bytes, result.ContentType, result.Name);
    }

    [HttpGet]
    [Route("resource/{id}.{extension}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetFileWithExtension(Guid id, string extension)
    {
        var result = await resourceAppService.GetFileAsync(id);

        return File(result.Bytes, result.ContentType, result.Name);
    }

    [HttpGet]
    [Route("image/{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetImage(Guid id)
    {
        var result = await resourceAppService.GetFileAsync(id, "image");

        return File(result.Bytes, result.ContentType);
    }

    [HttpGet]
    [Route("image/{id}.{extension}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetImageWithExtension(Guid id, string extension)
    {
        var result = await resourceAppService.GetFileAsync(id, "image");

        return File(result.Bytes, result.ContentType);
    }

    [HttpGet]
    [Route("api/resource/get")]
    [AllowAnonymous]
    public Task<DataResult<GetResourceDto>> Get(Guid id)
    {
        return resourceAppService.GetAsync(id);
    }

    [HttpGet]
    [Route("api/resource/getExtensions")]
    [Permission(ResourcePermissions.View)]
    public Task<DataResult<List<string>>> GetExtensions()
    {
        return resourceAppService.GetExtensionsAsync();
    }
}
