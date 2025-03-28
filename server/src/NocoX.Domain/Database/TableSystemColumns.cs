using System;
using NocoX.Common;

namespace NocoX.Database;

public static class TableSystemColumns
{
    public static readonly TableColumn Id = new(
        Guid.NewGuid(),
        Guid.Empty,
        UiType.Id,
        "id",
        "Id",
        "",
        true,
        true,
        true,
        false,
        0,
        180
    );

    public static readonly TableColumn CreationTime = new(
        Guid.NewGuid(),
        Guid.Empty,
        UiType.CreatedTime,
        "createdTime",
        "Created Time",
        "",
        false,
        false,
        true,
        true,
        0,
        180
    );

    public static readonly TableColumn CreatedBy = new(
        Guid.NewGuid(),
        Guid.Empty,
        UiType.CreatedBy,
        "createBy",
        "Created By",
        "",
        false,
        false,
        true,
        true,
        0,
        180
    );

    public static readonly TableColumn LastModifiedTime = new(
        Guid.NewGuid(),
        Guid.Empty,
        UiType.LastModifiedTime,
        "lastModifiedTime",
        "Last Modified Time",
        "",
        false,
        false,
        true,
        true,
        0,
        180
    );

    public static readonly TableColumn LastModifiedBy = new(
        Guid.NewGuid(),
        Guid.Empty,
        UiType.LastModifiedBy,
        "lastModifiedBy",
        "Last Modified By",
        "",
        false,
        false,
        true,
        true,
        0,
        180
    );

    public static readonly TableColumn DeletedBy = new(
        Guid.NewGuid(),
        Guid.Empty,
        UiType.DeletedBy,
        "deletedBy",
        "Deleted By",
        "",
        false,
        false,
        true,
        true,
        0,
        180
    );

    public static readonly TableColumn DeletedTime = new(
        Guid.NewGuid(),
        Guid.Empty,
        UiType.DeletedTime,
        "deletedTime",
        "DeletionTime",
        "",
        false,
        false,
        true,
        true,
        0,
        180
    );

    public static readonly TableColumn IsDeleted = new(
        Guid.NewGuid(),
        Guid.Empty,
        UiType.IsDeleted,
        "isDeleted",
        "Is Deleted",
        "",
        false,
        false,
        true,
        true,
        0,
        180
    );

    public static TableColumn? GetSystemColumn(UiType type)
    {
        return type switch
        {
            UiType.Id => Id,
            UiType.CreatedTime => CreationTime,
            UiType.CreatedBy => CreatedBy,
            UiType.LastModifiedTime => LastModifiedTime,
            UiType.LastModifiedBy => LastModifiedBy,
            UiType.DeletedBy => DeletedBy,
            UiType.DeletedTime => DeletedTime,
            UiType.IsDeleted => IsDeleted,
            _ => null,
        };
    }
}
