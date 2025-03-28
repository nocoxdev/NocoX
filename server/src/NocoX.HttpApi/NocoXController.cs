using System;
using System.Collections.Generic;
using System.Linq;
using NocoX.Common.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Volo.Abp.AspNetCore.Mvc;

namespace NocoX;

/* Inherit your controllers from this class.
 */
public abstract class NocoXController : AbpController
{
    public override void OnActionExecuted(ActionExecutedContext context)
    {
        if (!context.ModelState.IsValid)
        {
            var errors = context
                .ModelState.Where(x => x.Value != null && x.Value.Errors.Count > 0)
                .SelectMany(x =>
                    x.Value.Errors.Where(e => !e.ErrorMessage.IsNullOrWhiteSpace()).Select(x => x.ErrorMessage)
                );

            context.Result = new JsonResult(new Result(false, errors.JoinAsString(";")));
        }

        base.OnActionExecuted(context);
    }
}
