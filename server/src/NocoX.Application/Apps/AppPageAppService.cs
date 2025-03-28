using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;
using NocoX.Apps.Dtos;
using NocoX.Common.Dtos;
using NocoX.Localization;
using Volo.Abp;
using Volo.Abp.Domain.Repositories;

namespace NocoX.Apps;

public class AppPageAppService(
    AppPageManager pageManager,
    AppManager appManager,
    IAppPageRepository pageRepository,
    IStringLocalizer<NocoXResource> localizer
) : NocoXApplicationService, IAppPageAppService
{
    public async Task<DataResult<PageGetDto>> AddAsync(AddPageInput input)
    {
        await appManager.CheckPermissionAsync(input.AppId);

        var page = new AppPage(
            input.AppId,
            input.ParentId,
            input.Path ?? "/",
            input.Title,
            input.Type,
            input.Description
        );

        var exist = await pageRepository.FirstOrDefaultAsync(x =>
            x.AppId == page.AppId && x.Path == page.Path && x.Type == page.Type
        );

        if (exist != null)
        {
            return DataFail<PageGetDto>(localizer["Page not exist."]);
        }

        var result = await pageManager.AddAsync(page, input.Content ?? string.Empty);
        var dto = ObjectMapper.Map<AppPageQueryItem, PageGetDto>(result);
        return DataSuccess(dto);
    }

    public async Task<Result> DeleteAsync(Guid id)
    {
        var page = await pageRepository.GetAsync(id);

        await appManager.CheckPermissionAsync(page.AppId);

        await pageManager.DeleteAsync(id);

        return Success();
    }

    public async Task<Result> UpdateAsync(UpdatePageInput input)
    {
        var page = await pageRepository.GetAsync(input.Id);

        await appManager.CheckPermissionAsync(page.AppId);

        page.Path = input.Path ?? "/";
        page.Title = input.Title;
        page.Description = input.Description;

        var exist = await pageRepository.FirstOrDefaultAsync(x =>
            x.AppId == page.AppId && x.Path == page.Path && x.Id != page.Id && page.Type == x.Type
        );

        if (exist != null)
        {
            throw new UserFriendlyException("Page not exist.");
        }

        await pageRepository.UpdateAsync(page);

        return Success();
    }

    public async Task<Result> UpdateContentAsync(UpdatePageContentInput input)
    {
        var page = await pageRepository.GetAsync(input.Id);
        await appManager.CheckPermissionAsync(page.AppId);
        await pageManager.UpdateContentAsync(input.Id, input.Comment ?? "", input.Content);

        return Success();
    }

    public async Task<DataResult<List<PageGetDto>>> GetListAsync(Guid appId)
    {
        await appManager.CheckPermissionAsync(appId);
        var pages = (await pageRepository.GetListAsync(x => x.AppId == appId)).OrderBy(x => x.Order).ToList();

        var dtos = ObjectMapper.Map<List<AppPage>, List<PageGetDto>>(pages);
        return DataSuccess(dtos);
    }

    public async Task<Result> Reorder(ReorderInput input)
    {
        var page = await pageRepository.GetAsync(input.Id);
        await appManager.CheckPermissionAsync(page.AppId);
        await pageManager.Reorder(input.Id, input.ToParentId, input.ToIndex);

        return Success();
    }

    public async Task<Result> EnableAsync(Guid id)
    {
        var page = await pageRepository.GetAsync(id);
        await appManager.CheckPermissionAsync(page.AppId);
        page.Enabled = true;
        await pageRepository.UpdateAsync(page);
        return Success();
    }

    public async Task<Result> DisableAsync(Guid id)
    {
        var page = await pageRepository.GetAsync(id);

        await appManager.CheckPermissionAsync(page.AppId);

        page.Enabled = false;
        await pageRepository.UpdateAsync(page);
        return Success();
    }
}
