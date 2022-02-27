namespace backend.lib;

public class TokenGenerator
{
    public static Token GenerateToken()
    {
        String token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
        DateTime now = DateTime.Now;
        return new Token() {
            token = token,
            CreatedAt = now
        };
    }

    public class Token
    {
        public String token { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
