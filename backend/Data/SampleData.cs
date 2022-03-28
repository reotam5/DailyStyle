using backend.Models;

namespace backend.Data;
public class SampleData
{
  public static List<Tag> GetTags()
  {
    List<Tag> tags = new List<Tag>() {
         new Tag { Id = 1, UserId = "auth0|6221401c34992b00694eef08", Title = "Tops" },
         new Tag { Id = 2, UserId = "auth0|6221401c34992b00694eef08", Title = "Bottoms" },
         new Tag { Id = 3, UserId = "auth0|6221401c34992b00694eef08", Title = "Outerwear" },
         new Tag { Id = 4, UserId = "auth0|6221401c34992b00694eef08", Title = "Accessories" }
      };

    return tags;
  }

  public static List<Clothing> GetClothings()
  {
    List<Clothing> clothings = new List<Clothing>() {
         new Clothing {
            Id = 1,
            UserId = "auth0|6221401c34992b00694eef08",
            Title = "T-Shirt",
            Description = "shirt",
            isFavorite = true,
            ImageType = "data:image/png;base64",
            Image = convertImageToBase64("./Data/tshirt.png"),
            Tags = new List<Tag>() {
                GetTags()[0],
            }
         },
         new Clothing {
            Id = 2,
            UserId = "auth0|6221401c34992b00694eef08",
            Title = "Jeans",
            Description = "jeans",
            isFavorite = false,
            ImageType = "data:image/jpg;base64",
            Image = convertImageToBase64("./Data/jeans.jpg"),
            Tags = new List<Tag>() {
                GetTags()[1],
            }
         },
         new Clothing {
            Id = 3,
            UserId = "auth0|6221401c34992b00694eef08",
            Title = "Jacket",
            Description = "jacket",
            isFavorite = false,
            ImageType = "data:image/jpg;base64",
            Image = convertImageToBase64("./Data/outerwear.jpg"),
            Tags = new List<Tag>() {
                GetTags()[2],
            }
         },
         new Clothing {
            Id = 4,
            UserId = "auth0|6221401c34992b00694eef08",
            Title = "Shoes",
            Description = "shoes",
            isFavorite = false,
            ImageType = "data:image/jpg;base64",
            Image = convertImageToBase64("./Data/shoes.jpg"),
            Tags = new List<Tag>() {
                GetTags()[3],
            }
         },
      };

    return clothings;
  }

  private static byte[] convertImageToBase64(string src)
  {
    byte[] image = System.IO.File.ReadAllBytes(src);
    return image;
  }
}