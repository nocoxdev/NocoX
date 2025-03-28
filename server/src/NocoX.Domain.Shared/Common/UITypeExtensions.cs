using System;

namespace NocoX.Common;

public static class UITypeExtensions
{
    public static Type GetClrType(this UiType uiType)
    {
        return uiType switch
        {
            UiType.Id => typeof(Guid),
            UiType.Bool => typeof(bool),
            UiType.SingleText => typeof(string),
            UiType.LongText => typeof(string),
            UiType.Integer => typeof(int),
            UiType.Decimal => typeof(decimal),
            UiType.Time => typeof(TimeSpan),
            UiType.Date => typeof(DateTime),
            UiType.DateTime => typeof(DateTime),
            UiType.Percent => typeof(decimal),
            UiType.Image => typeof(Guid),
            UiType.Attachment => typeof(Guid),
            UiType.Relation => typeof(Guid),
            UiType.User => typeof(Guid),
            UiType.CreatedTime => typeof(DateTime),
            UiType.CreatedBy => typeof(Guid),
            UiType.LastModifiedTime => typeof(DateTime),
            UiType.LastModifiedBy => typeof(Guid),
            UiType.DeletedBy => typeof(Guid),
            UiType.DeletedTime => typeof(DateTime),
            UiType.IsDeleted => typeof(bool),
            _ => throw new ArgumentOutOfRangeException(nameof(uiType), uiType, null),
        };
    }

    public static bool IsSystem(this UiType uiType)
    {
        return uiType switch
        {
            UiType.Id => true,
            UiType.Bool => false,
            UiType.SingleText => false,
            UiType.LongText => false,
            UiType.Integer => false,
            UiType.Decimal => false,
            UiType.Time => false,
            UiType.Date => false,
            UiType.DateTime => false,
            UiType.Percent => false,
            UiType.Image => false,
            UiType.Attachment => false,
            UiType.Relation => false,
            UiType.User => false,
            UiType.CreatedTime => true,
            UiType.CreatedBy => true,
            UiType.LastModifiedTime => true,
            UiType.LastModifiedBy => true,
            UiType.DeletedBy => true,
            UiType.DeletedTime => true,
            UiType.IsDeleted => true,
            _ => throw new ArgumentOutOfRangeException(nameof(uiType), uiType, null),
        };
    }
}
