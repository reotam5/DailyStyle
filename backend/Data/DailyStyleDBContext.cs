using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class DailyStyleDBContext : DbContext
{
    public DailyStyleDBContext(DbContextOptions<DailyStyleDBContext> options) : base(options)
    {
    }

    public DbSet<User>? Users { get; set; }
    public DbSet<Clothing>? Clothings { get; set; }
    public DbSet<Tag>? Tags { get; set; }
    public DbSet<ClothingTag>? ClothingTags { get; set; }


    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<User>()
        .Property(b => b.Id)
        .ValueGeneratedOnAdd();

        builder.Entity<Clothing>()
        .Property(b => b.Id)
        .ValueGeneratedOnAdd();

        builder.Entity<Tag>()
        .Property(b => b.Id)
        .ValueGeneratedOnAdd();

        builder.Entity<ClothingTag>()
        .HasKey(t => new { t.ClothingId, t.TagId });

        builder.Entity<ClothingTag>()
        .HasOne(pt => pt.Clothing)
        .WithMany(p => p.ClothingTags)
        .HasForeignKey(pt => pt.ClothingId);

        builder.Entity<ClothingTag>()
        .HasOne(pt => pt.Tag)
        .WithMany(t => t.ClothingTags)
        .HasForeignKey(pt => pt.TagId);


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

    public async Task<User?> GetUserByUserName(string userName)
    {
        return await Users.FirstOrDefaultAsync(u => u.UserName == userName);
    }

    public async Task<User?> GetUserByToken(string token)
    {
        return await Users.FirstOrDefaultAsync(u => u.Token == token);
    }

    public async Task UpdateUser(User user)
    {
        Users.Update(user);
        await SaveChangesAsync();
        return;
    }

    public async Task<User?> CreateUser(User user)
    {
        Users.Add(user);
        await SaveChangesAsync();
        return user;
    }
}