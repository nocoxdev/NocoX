using System.Threading.Tasks;
using NocoX.Apps.Dtos;
using NocoX.Common.Dtos;
using NocoX.Templates.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp.Application.Dtos;

namespace NocoX.Templates
{
    [ApiController]
    [Authorize]
    [Route("api/block")]
    public class BlockController(IBlockAppService blockAppService) : NocoXController
    {
        [HttpPost]
        [Route("getPageList")]
        public Task<DataResult<PagedResultDto<BlockGetDto>>> GetPageList(
            [FromBody] BlockGetPageListInput input
        )
        {
            return blockAppService.GetPageListAsync(input);
        }

        [HttpPost]
        [Route("create")]
        public Task<Result> Create([FromBody] BlockCreateInput input)
        {
            return blockAppService.CreateAsync(input);
        }

        [HttpPost]
        [Route("update")]
        public Task<Result> Update([FromBody] BlockUpdateInput input)
        {
            return blockAppService.UpdateAsync(input);
        }

        [HttpPost]
        [Route("delete")]
        public Task<Result> Delete([FromBody] OnlyIdInput input)
        {
            return blockAppService.DeleteAsync(input.Id);
        }
    }
}
