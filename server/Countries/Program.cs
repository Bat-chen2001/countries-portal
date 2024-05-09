
using Amazon.Auth.AccessControlPolicy;
using Microsoft.Extensions.Options;
using Repository;
using Repository.Utils;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<MongoDatabaseSettings>(
             builder.Configuration.GetSection(nameof(MongoDatabaseSettings)));
builder.Services.AddSingleton<IDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<MongoDatabaseSettings>>().Value);

builder.Services.AddSingleton<MongoRepository>();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



builder.Services.AddCors(options =>
{
    options.AddPolicy
    (
       "CorsPolicy",
    policy =>
    {
        policy.SetIsOriginAllowed(_ => true);
        policy.AllowAnyHeader().WithMethods("OPTIONS", "HEAD", "CONNECT", "GET", "POST", "PUT", "DELETE", "PATCH")
             .AllowCredentials();
    }
    );
});

var app = builder.Build();



if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

MongoRepository mongoRepo = app.Services.GetRequiredService<MongoRepository>();
importData.Initialize(mongoRepo);

importData.ImportDataFromJsonAsync();

app.Run();
