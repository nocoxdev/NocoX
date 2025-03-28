using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace NocoX.AppDatas;

public class AppDataRecord : FullAuditedEntity<Guid>
{
    public AppDataRecord(Guid id, Guid appId, Guid tableId, Guid? formId, string data)
        : base(id)
    {
        Id = id;
        AppId = appId;
        TableId = tableId;
        FormId = formId;
        Data = data;
    }

    public Guid AppId { get; set; }

    public Guid TableId { get; set; }

    public Guid? FormId { get; set; }

    public string Data { get; set; }

    public void SetData(string data)
    {
        Data = data;
    }
}
