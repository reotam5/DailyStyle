using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models;

public class Clothing
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [JsonIgnore]
    public int? Id { get; set; }

    public int? UserId { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public byte[]? Image { get; set; }

    [JsonIgnore]
    [ForeignKey("UserId")]
    public User? User { get; set; }

    [JsonIgnore]
    public ICollection<ClothingTag>? ClothingTags { get; set; }
}