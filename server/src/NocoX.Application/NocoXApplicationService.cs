using NocoX.Common.Dtos;
using Volo.Abp.Application.Services;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace NocoX;

public abstract class NocoXApplicationService : ApplicationService
{
    /// <summary>
    /// return result
    /// </summary>
    /// <param name="success"></param>
    /// <returns></returns>
    public Result Result(bool success)
    {
        return new Result(success, "");
    }

    /// <summary>
    /// return result
    /// </summary>
    /// <param name="success"></param>
    /// <param name="message"></param>
    /// <returns></returns>
    public Result Result(bool success, string message)
    {
        return new Result(success, message);
    }

    /// <summary>
    /// return success result
    /// </summary>
    /// <returns></returns>
    public Result Success(string message = "")
    {
        return Result(true, message);
    }

    public Result Fail(string message = "")
    {
        return Result(false, message);
    }

    public DataResult<T> DataResult<T>(bool success, T data)
    {
        return new DataResult<T>(success, data);
    }

    public DataResult<T> DataResult<T>(bool success, T data, string message)
    {
        return new DataResult<T>(success, message, data);
    }

    public DataResult<T> DataFail<T>(string message)
    {
        return DataResult<T>(false, default, message);
    }

    public DataResult<T> DataSuccess<T>(T data)
    {
        return new DataResult<T>(data);
    }
}
