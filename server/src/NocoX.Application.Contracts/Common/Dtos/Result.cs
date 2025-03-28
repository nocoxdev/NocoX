namespace NocoX.Common.Dtos;

public class Result
{
    public Result(bool success)
    {
        Success = success;
        Message = string.Empty;
    }

    public Result(bool success, string message)
    {
        Success = success;
        Message = message;
    }

    public bool Success { get; set; }

    public string? Message { get; set; }
}

public class DataResult<T> : Result
{
    public DataResult(T data)
        : base(true, string.Empty)
    {
        Data = data;
    }

    public DataResult(bool success, T data)
        : base(success, string.Empty)
    {
        Data = data;
    }

    public DataResult(bool success, string message, T data)
        : base(success, message)
    {
        Data = data;
    }

    public T Data { get; set; }
}
