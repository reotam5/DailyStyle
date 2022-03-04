using backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

Console.WriteLine("Hello World!");
Console.WriteLine($"https://{builder.Configuration["Auth0:Domain"]}/");
Console.WriteLine($"{builder.Configuration["Auth0:Audience"]}/");

builder.Services.AddAuthentication(options=> {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options => {
    options.Authority = $"https://{builder.Configuration["Auth0:Domain"]}/";
    options.Audience = $"{builder.Configuration["Auth0:Audience"]}/";
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<DailyStyleDBContext>(option=>{
    option.UseSqlite(connectionString);
});

// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson(options=>{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(option => {
    option.AddPolicy("CorsPolicy", p => {
        p.AllowAnyOrigin();
        p.AllowAnyMethod();
        p.AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope()) {
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<DailyStyleDBContext>();    
    context.Database.Migrate();
}

app.Run();
