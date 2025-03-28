namespace NocoX.Account.Dtos;

public class RefreshTokenInput
{
    public required string RefreshToken { get; set; }

    public required string AccessToken { get; set; }
}
