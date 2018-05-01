using System;
using System.Collections.Generic;
using System.Linq;
using WebApp.Models;

namespace WebApp.Repositories
{
    // ReSharper disable once ClassNeverInstantiated.Global : Class injected
    public class InMemoryOrderRepository : IOrdersRepository
    {
        private static List<Order> _orders;
        private readonly Random _rnd = new Random();
        public InMemoryOrderRepository()
        {
            if (_orders == null) Feed(20, 10);
        }

        private void Feed(int numberOfPendingOrders, int numberOfCompletedOrders)
        {
            DateTime date;
            _orders = new List<Order>();
            for (var i = 0; i < numberOfCompletedOrders; i++)
            {
                date = DateTime.UtcNow.AddDays(-1);
                _orders.Add(new Order()
                {
                    Id = i,
                    ReferenceNumber = date.ToString("yyMMddHHmmssff") + i.ToString("D4"),
                    Material = $"Material {i}",
                    Status = "Completed",
                    Quantity = _rnd.Next(1, 100),
                    CreationDate = date,
                    CompletionDate = DateTime.UtcNow,
                    Priority = int.MaxValue
                });
            }

            for (var i = numberOfCompletedOrders; i < numberOfCompletedOrders + numberOfPendingOrders; i++)
            {
                date = DateTime.UtcNow.AddDays(-1);
                _orders.Add(new Order()
                {
                    Id = i, Material = $"Material {i}",
                    ReferenceNumber = date.ToString("yyMMddHHmmssff") + i.ToString("D4"),
                    Status ="Scheduled",
                    Quantity = _rnd.Next(1, 100),
                    CreationDate = date,
                    Priority = i
                });
            }
            int nextId = _orders.Max(o => o.Id) + 1;
            date = DateTime.UtcNow.AddHours(-2);
            _orders.Add(new Order()
            {
                Id = nextId,
                Material = $"Material {nextId}",
                ReferenceNumber = date.ToString("yyMMddHHmmssff") + nextId.ToString("D4"),
                Status = "InProgress",
                Quantity = _rnd.Next(1, 100),
                CreationDate = date,
                StartedDate = date.AddHours(1),
                CompletionDate = date.AddHours(2),
                Priority = int.MaxValue
            });
        }

        public IEnumerable<Order> GetOrders()
        {
            return _orders;
        }

        public Order GetOrderById(int id)
        {
            return _orders.FirstOrDefault(o => o.Id == id);
        }

        public Order AddOrder(Order order)
        {
            order.Id = _orders.Max(o => o.Id)+1;
            order.CreationDate = DateTime.UtcNow;
            order.Status = "Scheduled";
            _orders.Add(order);
            return order;
        }

        public Order UpdateOrder(Order order)
        {
            var originalOrder = _orders.Find(o => o.Id == order.Id);
            originalOrder.Status = order.Status;
            originalOrder.Quantity = order.Quantity;
            originalOrder.StartedDate = order.StartedDate;
            originalOrder.CompletionDate = order.CompletionDate;
            originalOrder.Priority = order.Priority;
            return originalOrder;
        }

        public void DeleteOrder(int id)
        {
            _orders.Remove(_orders.Find(o => o.Id == id));
        }

        public void SetOrdersPriotityByOrder(IEnumerable<Order> priotizedList)
        {
            var i = 1;
            foreach (var order in priotizedList)
            {
                var original = GetOrderById(order.Id);
                original.Priority = i;
                i++;
            }
        }
    }
}
