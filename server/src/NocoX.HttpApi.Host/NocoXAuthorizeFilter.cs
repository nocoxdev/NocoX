using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using NocoX.Account;
using NocoX.Common.Dtos;
using NocoX.Permissions;

namespace NocoX;

public class NocoXAuthorizeFilter : AuthorizeFilter
{
    public NocoXAuthorizeFilter() { }

    public NocoXAuthorizeFilter(AuthorizationPolicy policy)
        : base(policy) { }

    public override async Task OnAuthorizationAsync(AuthorizationFilterContext context)
    {
        await base.OnAuthorizationAsync(context);

        if (HasAllowAnonymous(context))
        {
            return;
        }

        var accountAppService = context.HttpContext.RequestServices.GetRequiredService<IAccountAppService>();

        var result = await accountAppService.CheckCurrentUserAsync();

        if (result.Success == false)
        {
            context.Result = new ObjectResult(result) { StatusCode = StatusCodes.Status401Unauthorized };
        }

        var controllAttribute = GetPermissionGroupAttribute(context);

        var actionAttribute = GetPermissionAttribute(context);

        if (actionAttribute == null)
        {
            return;
        }
        var groupName = string.IsNullOrEmpty(actionAttribute.GroupName)
            ? controllAttribute?.GroupName
            : actionAttribute.GroupName;

        if (string.IsNullOrEmpty(groupName))
        {
            return;
        }

        var permissionChecker = context.HttpContext.RequestServices.GetRequiredService<IPermissionChecker>();

        var grant = await permissionChecker.IsGrantedAsync(groupName, actionAttribute.PermissionName);

        if (grant != true)
        {
            context.Result = new ObjectResult(new Result(false, "No authorization,please contact admin."))
            {
                StatusCode = StatusCodes.Status403Forbidden,
            };
        }
    }

    private static bool HasAllowAnonymous(AuthorizationFilterContext context)
    {
        var filters = context.Filters;
        for (var i = 0; i < filters.Count; i++)
        {
            if (filters[i] is IAllowAnonymousFilter)
            {
                return true;
            }
        }

        var endpoint = context.HttpContext.GetEndpoint();
        if (endpoint?.Metadata?.GetMetadata<IAllowAnonymous>() != null)
        {
            return true;
        }

        return false;
    }

    private static PermissionAttribute? GetPermissionAttribute(AuthorizationFilterContext context)
    {
        return context.ActionDescriptor.GetMethodInfo().GetCustomAttribute<PermissionAttribute>(false);
    }

    private static PermissionGroupAttribute? GetPermissionGroupAttribute(AuthorizationFilterContext context)
    {
        if (context.ActionDescriptor is ControllerActionDescriptor controllerActionDescriptor)
        {
            return controllerActionDescriptor.ControllerTypeInfo.GetCustomAttribute<PermissionGroupAttribute>(false);
        }
        else
        {
            return null;
        }
    }
}
