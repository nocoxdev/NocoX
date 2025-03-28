namespace NocoX.Account.Dtos;

public class LoginResultDto
{
    public string UserName { get; set; }

    public string RefreshToken { get; set; }

    public string? AccessToken { get; set; }
}
