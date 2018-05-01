using System.Collections.Generic;
using WebApp.Models;

namespace WebApp.Repositories
{
    public interface IOrdersRepository
    {
        Order AddOrder(Order order);
        Order GetOrderById(int id);
        IEnumerable<Order> GetOrders();
        Order UpdateOrder(Order order);
        void DeleteOrder(int id);
        void SetOrdersPriotityByOrder(IEnumerable<Order> priotizedList);
    }
}
