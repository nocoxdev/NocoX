using System;
using Volo.Abp.Domain.Repositories;

namespace NocoX.Templates;

public interface ITemplateRepository : IRepository<Template, Guid> { }
