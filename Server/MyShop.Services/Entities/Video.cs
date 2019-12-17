using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace VideoList.Services {
    /// <summary>
    /// Video model of the table
    /// </summary>
    public class Video {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("genre")]
        public string Genre { get; set; }

        [JsonProperty("length")]
        public int Length { get; set; }

        [JsonProperty("releaseDate")]
        public DateTime ReleaseDate { get; set; }

        [JsonProperty("seriesId")]
        public int SeriesId { get; set; }

        [JsonProperty("reviews")]
        [NotMapped]
        public List<Review> Reviews { get; set; }
    }
}
