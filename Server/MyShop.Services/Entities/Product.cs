using Newtonsoft.Json;

namespace MyShop.Services {
    public class Product {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("price")]
        public double Price { get; set; }

        [JsonProperty("image")]
        public string Image { get; set; }
    }
}
