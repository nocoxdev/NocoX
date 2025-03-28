using System;
using System.Linq;
using System.Threading.Tasks;
using NocoX.Common.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.AspNetCore.ExceptionHandling;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.AspNetCore.Mvc.ExceptionHandling;
using Volo.Abp.Authorization;
using Volo.Abp.ExceptionHandling;
using Volo.Abp.Http;

namespace NocoX;

public class NocoXExceptionFilter : AbpExceptionFilter
{
    protected override async Task HandleAndWrapException(ExceptionContext context)
    {
        LogException(context, out var remoteServiceErrorInfo);

        await context
            .GetRequiredService<IExceptionNotifier>()
            .NotifyAsync(new ExceptionNotificationContext(context.Exception));

        if (context.Exception is AbpAuthorizationException)
        {
            await context
                .HttpContext.RequestServices.GetRequiredService<IAbpAuthorizationExceptionHandler>()
                .HandleAsync(context.Exception.As<AbpAuthorizationException>(), context.HttpContext);
        }
        else
        {
            context.HttpContext.Response.Headers.Append(AbpHttpConsts.AbpErrorFormat, "true");
            context.HttpContext.Response.StatusCode = StatusCodes.Status200OK;

            context.Result = new JsonResult(
                new Result(false, context.Exception.Message ?? remoteServiceErrorInfo.Message ?? "")
            );
        }

        context.ExceptionHandled = true;
    }
}
