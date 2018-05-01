using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using WebApp.Models;
using WebApp.Repositories;

namespace WebApp.Controllers.api
{
    public class OrdersController : ApiController
    {

        private readonly IOrdersRepository _repository;
        
        public OrdersController(IOrdersRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }
        [HttpGet]
        [Route("api/Orders")]
        public IHttpActionResult Get([FromUri] string status = "")
        {
            var orders = _repository.GetOrders().Where(
                order => status == string.Empty || order.Status.ToLowerInvariant() == status.ToLowerInvariant());


            return Ok(orders);
        }
        [HttpGet]
        [Route("api/Order/{id}")]
        public IHttpActionResult Get(int id)
        {
            var order = _repository.GetOrderById(id);
            if (order == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(order);
            }
        }

        [HttpPost]
        [Route("api/orders/setpriority")]
        public IHttpActionResult SetOrdersPriority([FromBody] IEnumerable<Order> orders)
        {
            _repository.SetOrdersPriotityByOrder(orders);
            return Ok();
        }

        [HttpPost]
        [Route("api/Order")]
        public IHttpActionResult Post([FromBody]Order order)
        {
            return Ok(_repository.AddOrder(order));
        }

        [HttpPut]
        [Route("api/Order/{id}")]
        public IHttpActionResult Put([FromUri]int id, [FromBody]Order order)
        {
            if (id != order.Id) return BadRequest();
            return Ok(_repository.UpdateOrder(order));
        }

        [HttpDelete]
        [Route("api/Order/{id}")]
        public IHttpActionResult Delete(int id)
        {
            _repository.DeleteOrder(id);
            return Ok( );
        }
    }
}
