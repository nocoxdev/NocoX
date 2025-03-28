using NocoX.Common.Dtos;

namespace NocoX.Templates.Dtos;

public class BlockGetPageListInput : QueryPageListParamsInput
{
    public BlockType Type { get; set; }
}
