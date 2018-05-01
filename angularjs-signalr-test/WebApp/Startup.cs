using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;
[assembly: OwinStartup(typeof(WebApp.Startup))]
namespace WebApp
{
    
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.Map("/signalr", map =>

            {
                map.UseCors(CorsOptions.AllowAll);
                var hubConfiguration = new HubConfiguration
                {
                    EnableDetailedErrors = true,
                    EnableJSONP = true,
                };

                map.RunSignalR(hubConfiguration);

            });
            //app.UseCors(CorsOptions.AllowAll);
            //app.Map("")
            //app.MapSignalR(new HubConfiguration()
            //{
            //    EnableDetailedErrors = true,
            //    EnableJSONP = true,

            //});
        }
    }
}

