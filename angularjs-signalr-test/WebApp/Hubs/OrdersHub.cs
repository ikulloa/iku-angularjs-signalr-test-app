using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using WebApp.Models;

namespace WebApp.Hubs
{

    [HubName("ordersHub")]
    // ReSharper disable once ClassNeverInstantiated.Global : Owin instantiates it
    public class OrdersHub : Hub/*<IOrdersHub>*/
    {
        public void Fix()
        {
            Clients.Caller.Subscribed();
        }
      
        public void NotifyPriorityChanged(Order order)
        {
            Clients.Others.OrderPriorityChanged(order);
        }

        public void NotifyOrderCreated(Order order)
        {
            Clients.Others.OrderCreated(order);
        }

        public void NotifyOrderCompleted(Order order)
        {
            Clients.Others.OrderCompleted(order);
        }

        public void NotifyOrderInProcess(Order order)
        {
            Clients.Others.OrderInProcess(order);
        }

        public void NotifyOrderCanceled(Order order)
        {
            Clients.Others.OrderCanceled(order);
        }

        public void NotifyOrderStopped(Order order)
        {
            Clients.Others.OrderStopped(order);
        }

        public void NotifyOrderModified(Order order)
        {
            Clients.Others.OrderModified(order);
        }
    }

   
}