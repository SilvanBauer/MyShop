using Newtonsoft.Json;

namespace VideoList.Services {
    /// <summary>
    /// Review model of the table
    /// </summary>
    public class Review {
        [JsonProperty("reviewText")]
        public string ReviewText { get; set; }

        [JsonProperty("rating")]
        public int Rating { get; set; }

        [JsonIgnore]
        public int UserId { get; set; }

        [JsonIgnore]
        public int VideoId { get; set; }
    }
}
