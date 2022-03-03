using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models;

public class Tag
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [JsonIgnore]
    public int? Id { get; set; }

    [Required]
    public int UserId { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    [JsonIgnore]
    [ForeignKey("UserId")]
    public User? User { get; set; }

    [JsonIgnore]
    public ICollection<ClothingTag>? ClothingTags { get; set; }
}