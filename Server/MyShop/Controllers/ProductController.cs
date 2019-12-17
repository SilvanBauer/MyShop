using log4net;
using Microsoft.AspNetCore.Mvc;
using MyShop.Services;

namespace MyShop.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase {
        private readonly ILog _log = LogManager.GetLogger(typeof(ProductController));
        private readonly IProductService _productService;

        public ProductController(IProductService productService) {
            _productService = productService;
        }

        [HttpGet]
        public IActionResult GetAllProducts() {
            _log.Info("Returned all products");

            return Ok(_productService.GetAllProducts());
        }

        [HttpGet("{productId:int}")]
        public IActionResult GetProductById(int productId) {
            var product = _productService.GetProductById(productId);

            if (product != null) {
                _log.Info("Product " + product.Name + " with id " + product.Id + " returned");
            } else {
                _log.Error("Product with id " + productId + " not found");
            }

            return Ok(product);
        }
    }
}
