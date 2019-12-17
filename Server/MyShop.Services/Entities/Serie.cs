using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace VideoList.Services {
    /// <summary>
    /// Serie model of the table
    /// </summary>
    public class Serie {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("videos")]
        [NotMapped]
        public List<Video> Videos { get; set; }
    }
}
