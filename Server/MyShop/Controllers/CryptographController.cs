using Microsoft.AspNetCore.Mvc;
using VideoList.Services;

namespace VideoList.Controllers {
    /// <summary>
    /// This controller is used to test the encryption
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class CryptographController : ControllerBase {
        private ICryptographService _cryptographService;

        public CryptographController(ICryptographService cryptographService) {
            _cryptographService = cryptographService;
        }

        [HttpGet("{text}")]
        public IActionResult EncryptString(string text) {
            return Ok(_cryptographService.EncryptString(text));
        }
    }
}
