using System;
using Newtonsoft.Json;

namespace WebApp.Models
{
    public class Order
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("referenceNumber")]
        public string ReferenceNumber { get; set; }
        [JsonProperty("material")]
        public string Material { get; set; }
        [JsonProperty("quantity")]
        public int Quantity { get; set; }
        [JsonProperty("creationDate")]
        public DateTime CreationDate { get; set; }
        [JsonProperty("startedDate")]
        public DateTime? StartedDate { get; set; }
        [JsonProperty("completionDate")]
        public DateTime? CompletionDate { get; set; }
        [JsonProperty("status")]
        public string Status { get; set; }
        [JsonProperty("priority")]
        public int Priority { get; set; }
    }
}
