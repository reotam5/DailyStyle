using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class ClothingTag
{
    public int ClothingId { get; set; }

    public int TagId { get; set; }

    [ForeignKey("ClothingId")]
    public Clothing? Clothing { get; set; }

    [ForeignKey("TagId")]
    public Tag? Tag { get; set; }
}