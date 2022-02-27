using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class DailyStyleDBContext : DbContext
{
    public DailyStyleDBContext(DbContextOptions<DailyStyleDBContext> options) : base(options)
    {
    }

    public DbSet<User>? Users { get; set; }
}