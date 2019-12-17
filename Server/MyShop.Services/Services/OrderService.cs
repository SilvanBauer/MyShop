using System;
using System.Collections.Generic;

namespace MyShop.Services {
    public class OrderService : IOrderService {
        public void OrderProducts(List<Product> productsToOrder) {
            using (var db = new MyShopStore()) {
                var order = new Order() { OrderedDate = DateTime.Now };

                db.Order.Add(order);
                db.SaveChanges();

                foreach (var product in productsToOrder) {
                    db.OrderedProduct.Add(new OrderedProduct() {
                        OrderId = order.Id,
                        ProductId = product.Id,
                        State = 0
                    });
                }

                db.SaveChanges();
            }
        }
    }
}
