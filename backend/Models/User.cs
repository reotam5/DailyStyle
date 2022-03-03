using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models;

public class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [JsonIgnore]
    public int? Id { get; set; }

    [Required]
    public string? UserName { get; set; }

    [Required]
    [JsonIgnore]
    public string? Password { get; set; }

    [JsonIgnore]
    public DateTime? CreatedAt { get; set; }

    public string? Token { get; set; }

    [JsonIgnore]
    public ICollection<Clothing>? Clothings { get; set; }

    [JsonIgnore]
    public ICollection<Tag>? Tags { get; set; }
}