using System.Collections.Generic;
using System.Reflection;

namespace NocoX;

public static class ObjectExtensions
{
    public static Dictionary<string, object?> ToDictionary(this object obj)
    {
        var dictionary = new Dictionary<string, object?>();

        if (obj == null)
        {
            return dictionary;
        }

        var properties = obj.GetType().GetProperties(BindingFlags.GetField);

        foreach (var property in properties)
        {
            dictionary.Add(property.Name, property.GetValue(obj));
        }

        return dictionary;
    }
}
