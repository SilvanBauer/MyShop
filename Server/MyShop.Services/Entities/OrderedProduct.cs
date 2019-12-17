using Newtonsoft.Json;
using System;

namespace MyShop.Services {
    public class OrderedProduct {
        [JsonProperty("orderId")]
        public int OrderId { get; set; }

        [JsonProperty("productId")]
        public int ProductId { get; set; }

        [JsonProperty("state")]
        public int State { get; set; }

        [JsonProperty("sendDate")]
        public DateTime? SendDate { get; set; }
    }
}
