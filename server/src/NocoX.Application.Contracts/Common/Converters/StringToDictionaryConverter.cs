using System.Collections.Generic;
using System.Text.Json;
using AutoMapper;
using Volo.Abp.Json.SystemTextJson.JsonConverters;

namespace NocoX.Common.Converters;

public class StringToDictionaryConverter : ITypeConverter<string, Dictionary<string, object?>>
{
    public Dictionary<string, object?> Convert(
        string source,
        Dictionary<string, object?> destination,
        ResolutionContext context
    )
    {
        JsonSerializerOptions deserializeOptions = new() { Converters = { new ObjectToInferredTypesConverter() } };

        return JsonSerializer.Deserialize<Dictionary<string, object?>>(source, deserializeOptions) ?? [];
    }
}
