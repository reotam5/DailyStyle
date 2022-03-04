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
    public string? UserId { get; set; }

    public string? Title { get; set; }

    [JsonIgnore]
    public ICollection<Clothing>? Clothings { get; set; }
}