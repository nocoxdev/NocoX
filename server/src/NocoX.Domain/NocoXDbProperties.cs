using Volo.Abp.Data;

namespace NocoX;

public static class NocoXDbProperties
{
    public static string DbTablePrefix { get; set; } = "NX_";

    public static string AppTablePrefix { get; set; } = "App_";

    /// <summary>
    /// Default value: "null".
    /// </summary>

    public static string DbSchema { get; set; } = AbpCommonDbProperties.DbSchema;

    public const string DbType = "DbType";

    public const string ConnectionStringName = "Default";

}
