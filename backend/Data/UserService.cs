using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;
public class UserService {
    DailyStyleDBContext _context;

    public UserService(DailyStyleDBContext context) {
        _context = context;
    }

    public async Task<User?> GetUserByUserName(string userName) {
        return await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
    }

    public async Task<User?> GetUserByToken(string token) {
        return await _context.Users.FirstOrDefaultAsync(u => u.Token == token);
    }

    public async Task UpdateUser(User user) {
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
        return ;
    }

    public async Task<User?> CreateUser(User user) {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }
}