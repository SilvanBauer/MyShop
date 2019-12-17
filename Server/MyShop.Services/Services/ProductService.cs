using System.Collections.Generic;
using System.Linq;

namespace MyShop.Services {
    public class ProductService : IProductService {
        public List<Product> GetAllProducts() {
            using (var db = new MyShopStore()) {
                return db.Product.ToList();
            }
        }

        public Product GetProductById(int productId) {
            using (var db = new MyShopStore()) {
                return db.Product.Find(productId);
            }
        }
    }
}
