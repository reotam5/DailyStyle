using backend.Filters;
using backend.lib;
using backend.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("[controller]")]
[EnableCors("CorsPolicy")]
public class UserController : Controller {

    [HttpGet]
    [AuthFilter]
    public Dictionary<String, Object> Get(){
        User user = HttpContext.Items["user"] as User;

        //dont return password
        user.Password = "********";

        return ResponseFormatter.buildSuccess(user);
    }
}