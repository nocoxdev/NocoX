namespace NocoX.Account;

public class JwtConfig
{
    public required string Secret { get; set; }

    public required string Issuer { get; set; }

    public required string Audience { get; set; }

    public int AccessTokenExpiration { get; set; }

    public int RefreshTokenExpiration { get; set; }
}
