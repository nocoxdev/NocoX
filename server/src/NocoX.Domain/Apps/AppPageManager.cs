using System;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.EventBus.Local;
using Volo.Abp.Uow;

namespace NocoX.Apps;

public class AppPageManager(
    IAppRepository appRepository,
    IAppPageRepository pageRepository,
    IRepository<AppPageContent, Guid> pageContentRepository,
    ILocalEventBus localEventBus,
    IUnitOfWorkManager uowManager
) : DomainService
{
    public async Task<AppPageQueryItem> AddAsync(AppPage page, string content)
    {
        using (var uow = uowManager.Begin(requiresNew: true, isTransactional: true))
        {
            Check.NotNull(page, nameof(page));

            var app = await appRepository.GetResultAsync(page.AppId);

            Check.NotNull(app, nameof(app));

            var maxOrder = await pageRepository.GetMaxOrderAsync(x => x.AppId == page.AppId, page.ParentId);

            page.Order = maxOrder + 1;
            await pageRepository.InsertAsync(page);

            if (page.Type != PageType.Group)
            {
                var pageContent = new AppPageContent(page.Id, content);
                await pageContentRepository.InsertAsync(pageContent);
            }

            uow.OnCompleted(async () =>
            {
                await localEventBus.PublishAsync(
                    new AppChangedEvent { AppId = page.AppId, Comment = $"Add page({page.Title})" }
                );
            });

            await uow.CompleteAsync();
        }

        return await pageRepository.GetResultAsync(page.Id);
    }

    public async Task UpdateAsync(Guid id, string path, string title, string description)
    {
        using (var uow = uowManager.Begin(requiresNew: true, isTransactional: true))
        {
            var page = await pageRepository.GetAsync(id);

            page.Path = path ?? "";
            page.Title = title;
            page.Description = description;

            var exist = await pageRepository.FirstOrDefaultAsync(x =>
                x.AppId == page.AppId && x.Path == page.Path && x.Id != page.Id && page.Type == x.Type
            );

            if (exist != null)
            {
                throw new UserFriendlyException("Page not exist.");
            }

            uow.OnCompleted(async () =>
            {
                await localEventBus.PublishAsync(
                    new AppChangedEvent { AppId = page.AppId, Comment = $"Update page({page.Title})" }
                );
            });

            await uow.CompleteAsync();
            await pageRepository.UpdateAsync(page);
        }
    }

    public async Task UpdateContentAsync(Guid id, string comment, string content)
    {
        using (var uow = uowManager.Begin(requiresNew: true, isTransactional: true))
        {
            Check.NotNull(content, nameof(content));

            var page = await pageRepository.GetAsync(id);

            var pageContent = await pageContentRepository.SingleOrDefaultAsync(x => x.PageId == page.Id);

            if (pageContent == null)
            {
                var newPageContent = new AppPageContent(page.Id, content);
                await pageContentRepository.InsertAsync(newPageContent);
            }
            else
            {
                pageContent.Content = content;
                await pageContentRepository.UpdateAsync(pageContent);
            }

            uow.OnCompleted(async () =>
            {
                await localEventBus.PublishAsync(
                    new AppChangedEvent
                    {
                        AppId = page.AppId,
                        Comment = $"Update page({page.Title}) content: {comment}",
                    }
                );
            });

            await uow.CompleteAsync();
        }
    }

    public async Task Reorder(Guid id, Guid? toParentId, int toIndex)
    {
        using (var uow = uowManager.Begin(requiresNew: true, isTransactional: true))
        {
            var page = await pageRepository.GetAsync(id);

            await pageRepository.ReorderAsync(x => x.AppId == page.AppId, page.Id, toIndex, toParentId);

            uow.OnCompleted(async () =>
            {
                await localEventBus.PublishAsync(new AppChangedEvent { AppId = page.AppId, Comment = "Reorder pages" });
            });

            await uow.CompleteAsync();
        }
    }

    public async Task DeleteAsync(Guid id)
    {
        using (var uow = uowManager.Begin(requiresNew: true, isTransactional: true))
        {
            var page = await pageRepository.GetAsync(id);

            await pageRepository.DeleteWithReorderAsync(x => x.AppId == page.AppId, id);

            uow.OnCompleted(async () =>
            {
                await localEventBus.PublishAsync(
                    new AppChangedEvent
                    {
                        AppId = page.AppId,
                        Forced = true,
                        Comment = $"Delete page({page.Title})",
                    }
                );
            });
            await uow.CompleteAsync();
        }
    }
}
