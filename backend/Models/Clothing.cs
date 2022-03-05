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

    public string? UserId { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public bool? isFavorite { get; set; }

    public string? ImageType {get; set;}

    public byte[]? Image { get; set; }

    public ICollection<Tag>? Tags { get; set; }
}