using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class DailyStyleDBContext : DbContext
{
    public DailyStyleDBContext(DbContextOptions<DailyStyleDBContext> options) : base(options)
    {
    }

    public DbSet<User>? Users { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<User>()
        .Property(b => b.Id)
        .ValueGeneratedOnAdd();

        builder.Entity<User>()
        .HasData(
            new User
            {
                Id = 1,
                UserName = "admin",
                Password = "pass",
            }
        );
    }
}