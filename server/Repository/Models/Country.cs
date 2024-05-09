using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Repository.Models
{
    public class Country
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string  Name { get; set; }
        public string[] Capital { get; set; }
        public string Region { get; set; }
        public string SubRegion { get; set; }
        public int Population { get; set; }
        public string Flag { get; set; }
    }
}
