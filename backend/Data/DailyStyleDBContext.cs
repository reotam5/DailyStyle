using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class DailyStyleDBContext : DbContext
{
    public DailyStyleDBContext(DbContextOptions<DailyStyleDBContext> options) : base(options)
    {
    }

    public DbSet<Clothing>? Clothings { get; set; }
    public DbSet<Tag>? Tags { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<Clothing>()
        .Property(b => b.Id)
        .ValueGeneratedOnAdd();

        builder.Entity<Tag>()
        .Property(b => b.Id)
        .ValueGeneratedOnAdd();
    }
}