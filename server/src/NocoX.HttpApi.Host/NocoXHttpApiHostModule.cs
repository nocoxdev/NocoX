using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using NocoX.Account;
using NocoX.Resource;
using Volo.Abp;
using Volo.Abp.AspNetCore.Authentication.JwtBearer;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.AspNetCore.Mvc.AntiForgery;
using Volo.Abp.AspNetCore.Mvc.NewtonsoftJson;
using Volo.Abp.AspNetCore.Serilog;
using Volo.Abp.Autofac;
using Volo.Abp.BlobStoring;
using Volo.Abp.BlobStoring.FileSystem;
using Volo.Abp.Modularity;
using Volo.Abp.Swashbuckle;
using Volo.Abp.UI.Navigation.Urls;
using Volo.Abp.Uow;

namespace NocoX;

[DependsOn(
    typeof(NocoXHttpApiModule),
    typeof(NocoXApplicationModule),
    typeof(NocoXEntityFrameworkCoreModule),
    typeof(AbpAutofacModule),
    typeof(AbpAspNetCoreSerilogModule),
    typeof(AbpAspNetCoreMvcModule),
    typeof(AbpSwashbuckleModule),
    typeof(AbpBlobStoringFileSystemModule),
    typeof(AbpAspNetCoreMvcNewtonsoftModule),
    typeof(AbpAspNetCoreAuthenticationJwtBearerModule)
)]
public class NocoXHttpApiHostModule : AbpModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context) { }

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        var configuration = context.Services.GetConfiguration();
        ConfigureCors(context, configuration);
        ConfigureExceptionHandling(context);
        ConfigureAuthentication(context, configuration);
        ConfigureBlob(context, configuration);
        ConfigureModelValiation(context);
        ConfigureJson(context);
        // ConfigureSwaggerServices(context);
    }

    private static void ConfigureJson(ServiceConfigurationContext context)
    {
        context
            .Services.AddOptions<MvcNewtonsoftJsonOptions>()
            .Configure<IServiceProvider>(
                (options, rootServiceProvider) =>
                {
                    options.UseCamelCasing(processDictionaryKeys: true);
                }
            );
    }

    private static void ConfigureModelValiation(ServiceConfigurationContext context)
    {
        //Custom ModelState Invalid response format,override original InvalidModelStateResponseFactory
        //context.Services.Configure<ApiBehaviorOptions>(options =>
        //{
        //    options.InvalidModelStateResponseFactory = actionContext =>
        //    {
        //        var errors = actionContext.ModelState.Data.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
        //        return new JsonResult(new ResultDto(false, errors.JoinAsString(";")));
        //    };
        //});
    }

    private static void ConfigureExceptionHandling(ServiceConfigurationContext context)
    {
        context.Services.Configure<MvcOptions>(options =>
        {
            options.Filters.Add(typeof(NocoXExceptionFilter));
        });
    }

    private static void ConfigureBlob(
        ServiceConfigurationContext context,
        IConfiguration configuration
    )
    {
        var path = configuration.GetValue<string>("ResourcePath");

        context.Services.Configure<AbpBlobStoringOptions>(options =>
        {
            options.Containers.Configure<ResourceContainer>(container =>
            {
                container.UseFileSystem(fileSystem =>
                {
                    fileSystem.BasePath = AppDomain.CurrentDomain.BaseDirectory + $"\\{path}";
                });
            });
        });
    }

    //private static void ConfigureSwaggerServices(ServiceConfigurationContext context)
    //{
    //    context.Services.AddAbpSwaggerGen(options =>
    //    {
    //        var securityScheme = new OpenApiSecurityScheme
    //        {
    //            Name = "JWT Authentication",
    //            Description = "Enter JWT Bearer token.",
    //            In = ParameterLocation.Header,
    //            Type = SecuritySchemeType.Http,
    //            Scheme = "bearer", // must be lowercase
    //            BearerFormat = "JWT",
    //            Reference = new OpenApiReference
    //            {
    //                Id = NocoXHttpApiHostConstants.NocoXJwtBearerScheme,
    //                Type = ReferenceType.SecurityScheme,
    //            },
    //        };

    //        options.AddSecurityDefinition(securityScheme.Reference.Id, securityScheme);
    //        options.AddSecurityRequirement(
    //            new OpenApiSecurityRequirement { { securityScheme, Array.Empty<string>() } }
    //        );
    //    });
    //}

    private static void ConfigureAuthentication(
        ServiceConfigurationContext context,
        IConfiguration configuration
    )
    {
        context.Services.AddMvc(options =>
        {
            var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();

            options.Filters.Add(new NocoXAuthorizeFilter(policy));
        });

        context.Services.AddAuthorization();

        //AutoValidateIgnoredHttpMethods: A list of HTTP Methods to ignore on automatic antiforgery validation. Default value: "GET", "HEAD", "TRACE", "OPTIONS".
        //These HTTP Methods are safe to skip antiforgery validation since they don't change the application state.
        context.Services.Configure<AbpAntiForgeryOptions>(options =>
        {
            options.AutoValidate = false;
        });

        var jwtConfig = configuration.GetSection("JwtConfig").Get<JwtConfig>()!;
        context.Services.AddSingleton(jwtConfig);

        context.Services.AddAuthenticationNocoXJwtBearer(jwtConfig);
    }

    private static void ConfigureCors(
        ServiceConfigurationContext context,
        IConfiguration configuration
    )
    {
        context.Services.AddCors(options =>
        {
            options.AddPolicy(
                "AllowAll",
                builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                }
            );
        });
    }

    public override void OnApplicationInitialization(ApplicationInitializationContext context)
    {
        var app = context.GetApplicationBuilder();
        var env = context.GetEnvironment();

        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseAbpRequestLocalization();
        app.UseCorrelationId();
        app.UseRouting();

        app.UseCors("AllowAll");
        app.UseAuthentication();
        app.UseUnitOfWork();
        app.UseAuthorization();
        app.UseStaticFiles();

        app.UseAbpRequestLocalization(options =>
        {
            options.DefaultRequestCulture = new RequestCulture("en-US");
            options.RequestCultureProviders = [new AcceptLanguageHeaderRequestCultureProvider()];
        });

        app.UseJwtTokenMiddleware(NocoXHttpApiHostConstants.NocoXJwtBearerScheme);

        //app.UseSwagger();
        //app.UseSwaggerUI(c =>
        //{
        //    c.SwaggerEndpoint("swagger/v1/swagger.json", "NocoX API");
        //    c.DocumentTitle = "JWT Auth Demo";
        //    c.RoutePrefix = string.Empty;
        //});



        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapFallbackToFile("/app/{*path}", "app.html");
            endpoints.MapFallbackToFile("/preview/{*path}", "app.html");
            endpoints.MapFallbackToFile("admin.html");
        });

        app.UseAuditing();
        app.UseAbpSerilogEnrichers();
        ;
    }
}
