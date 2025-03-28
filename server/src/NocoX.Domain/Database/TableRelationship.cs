using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace NocoX.Database;

public class TableRelationship : FullAuditedEntity<Guid>
{
    public TableRelationship(Guid id, Guid columnId, Guid relatedTableId, Guid relatedTableDisplayColumnId)
        : base(id)
    {
        ColumnId = columnId;
        RelatedTableId = relatedTableId;
        RelatedTableDisplayColumnId = relatedTableDisplayColumnId;
    }

    public Guid ColumnId { get; set; }

    public Guid RelatedTableId { get; set; }

    public Guid RelatedTableDisplayColumnId { get; set; }
}
