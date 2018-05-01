using System.Web.Http;
using LightInject;
using WebApp.Repositories;

namespace WebApp
{
   
        public static class DependencyConfig
        {
            public static void Register(HttpConfiguration configuration)
            {
                var container = new ServiceContainer();
                container.RegisterApiControllers();
                container.Register<IOrdersRepository, InMemoryOrderRepository>(new PerContainerLifetime());
                container.EnableWebApi(configuration);
            }

        }
    
}
