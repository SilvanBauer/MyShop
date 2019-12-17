using System.Collections.Generic;

namespace MyShop.Services {
    public interface IOrderService {
        void OrderProducts(List<Product> productsToOrder);
    }
}
