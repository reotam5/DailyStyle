using System.Linq.Expressions;
using System.Web.Mvc;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace backend.Filters;

public class AuthFilterAttribute : FilterAttribute, IAsyncAuthorizationFilter
{
    private DailyStyleDBContext _context;

    public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
    {
        //dependency injection
        _context = context.HttpContext.RequestServices.GetService(typeof(DailyStyleDBContext)) as DailyStyleDBContext;

        //get token from header
        context.HttpContext.Request.Headers.TryGetValue("token", out var token);

        //get user from token
        User user = await _context.GetUserByToken(token);

        //validating user
        if (user == null)
        {
            context.Result = new UnauthorizedResult();
        }
        else
        {
            if (user.CreatedAt < DateTime.Now.AddMinutes(-15)) {
                context.Result = new UnauthorizedResult();
            }
            //update user
            user.CreatedAt = DateTime.Now;
            await _context.UpdateUser(user);
            context.HttpContext.Items.Add("user", user);
        }

        return;
    }
}