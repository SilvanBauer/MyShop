using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace VideoList.Services {
    /// <summary>
    /// User model of the table
    /// </summary>
    public class User {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonIgnore]
        public byte[] Password { get; set; }

        [NotMapped]
        [JsonProperty("unencryptedPassword")]
        public string UnencryptedPassword { get; set; }

        [JsonProperty("isAdmin")]
        public bool IsAdmin { get; set; }
    }
}
