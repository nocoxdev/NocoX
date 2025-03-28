# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["NuGet.Config", "."]
COPY ["src/NocoX.HttpApi.Host/NocoX.HttpApi.Host.csproj", "src/NocoX.HttpApi.Host/"]
COPY ["src/NocoX.Application/NocoX.Application.csproj", "src/NocoX.Application/"]
COPY ["src/NocoX.Domain/NocoX.Domain.csproj", "src/NocoX.Domain/"]
COPY ["src/NocoX.Domain.Shared/NocoX.Domain.Shared.csproj", "src/NocoX.Domain.Shared/"]
COPY ["src/NocoX.Application.Contracts/NocoX.Application.Contracts.csproj", "src/NocoX.Application.Contracts/"]
COPY ["src/NocoX.EntityFrameworkCore/NocoX.EntityFrameworkCore.csproj", "src/NocoX.EntityFrameworkCore/"]
COPY ["src/NocoX.HttpApi/NocoX.HttpApi.csproj", "src/NocoX.HttpApi/"]
RUN dotnet restore "./src/NocoX.HttpApi.Host/NocoX.HttpApi.Host.csproj"
COPY . .
WORKDIR "/src/src/NocoX.HttpApi.Host"
RUN dotnet build "./NocoX.HttpApi.Host.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./NocoX.HttpApi.Host.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NocoX.HttpApi.Host.dll"]