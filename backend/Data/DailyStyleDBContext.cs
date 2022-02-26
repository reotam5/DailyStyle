using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class DailyStyleDBContext : DbContext
{
    public DailyStyleDBContext(DbContextOptions<DailyStyleDBContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>().HasData(
            new User { Id = 1, UserName = "admin", Password = "admin" },
            new User { Id = 2, UserName = "user", Password = "user" }
        );
    }

    public DbSet<User>? Users { get; set; }
}