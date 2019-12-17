using log4net;
using Microsoft.AspNetCore.Mvc;
using MyShop.Services;
using System.Collections.Generic;

namespace MyShop.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase {
        private readonly ILog _log = LogManager.GetLogger(typeof(OrderController));
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService) {
            _orderService = orderService;
        }

        [HttpPost]
        public void OrderProducts([FromBody] List<Product> productsToOrder) {
            _orderService.OrderProducts(productsToOrder);

            _log.Info("Products Ordered! Ordered Products are:");

            foreach (var product in productsToOrder) {
                _log.Info("\t" + product.Name + "/" + product.Id);
            }
        }
    }
}
