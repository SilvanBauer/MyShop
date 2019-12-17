using System.Collections.Generic;

namespace MyShop.Services {
    public interface IProductService {
        Product GetProductById(int productId);

        List<Product> GetAllProducts();
    }
}
