using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace NocoX
{
    public static class NocoXHttpApiHostConstants
    {
        public const string NocoXAccessTokenName = "access-token";

        public const string NocoXJwtBearerScheme = JwtBearerDefaults.AuthenticationScheme;
    }
}
