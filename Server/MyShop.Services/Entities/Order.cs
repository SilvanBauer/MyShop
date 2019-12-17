using Newtonsoft.Json;
using System;

namespace MyShop.Services {
    public class Order {
        [JsonProperty("Id")]
        public int Id { get; set; }

        [JsonProperty("orderedDate")]
        public DateTime OrderedDate { get; set; }
    }
}
