#nullable disable
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    [Authorize]
    [ApiController]
    public class ClothingsController : ControllerBase
    {
        private readonly DailyStyleDBContext _context;


        public ClothingsController(DailyStyleDBContext context)
        {
            _context = context;
        }


        // POST: api/Clothings
        [HttpPost]
        public async Task<ActionResult<Clothing>> PostClothing(Dictionary<String, String[]> requestBody)
        {
            requestBody.TryGetValue("Title", out String[] Title);
            requestBody.TryGetValue("Description", out String[] Description);
            requestBody.TryGetValue("Image", out String[] Image);
            requestBody.TryGetValue("Tags", out String[] sTags);


            Clothing clothing = new Clothing
            {
                Title = Title[0],
                Description = Description[0],
                Image = Convert.FromBase64String(Image[0]),
                UserId = this.User.FindFirst(ClaimTypes.NameIdentifier).Value
            };

            foreach (String TagId in sTags)
            {
                try
                {
                    int Tagid = Int32.Parse(TagId);
                    Tag tag = await _context.Tags.FindAsync(Tagid);
                    if (clothing.Tags == null)
                    {
                        clothing.Tags = new List<Tag>();
                    }
                    clothing.Tags.Add(tag);
                }
                catch (FormatException)
                {
                    return BadRequest();
                }
            }

            _context.Clothings.Add(clothing);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClothing", new { id = clothing.Id }, clothing);
        }


        // GET: api/Clothings
        // This get route will get all clothings for A user
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Clothing>>> GetClothings()
        {
            return await _context.Clothings.Where(c => c.UserId == this.User.FindFirst(ClaimTypes.NameIdentifier).Value).Include(c=>c.Tags).ToListAsync();
        }

        // GET: api/Clothings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Clothing>> GetClothing(int? id)
        {
            var clothing = await _context.Clothings.FindAsync(id);

            //if this clothing does not belong to the user, return a 404
            if (clothing == null || clothing.UserId != this.User.FindFirst(ClaimTypes.NameIdentifier).Value)
            {
                return NotFound();
            }

            return clothing;
        }


        // PUT: api/Clothings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClothing(int? id, Dictionary<String, String> requestBody)
        {
            var oldClothing = await _context.Clothings.FindAsync(id);

            //if this clothing does not belong to the user, return a 404
            if (oldClothing == null || oldClothing.UserId != this.User.FindFirst(ClaimTypes.NameIdentifier).Value)
            {
                return NotFound();
            }

            requestBody.TryGetValue("Title", out string Title);
            requestBody.TryGetValue("Description", out string Description);
            requestBody.TryGetValue("Image", out string Image);


            oldClothing.Title = Title;
            oldClothing.Description = Description;
            oldClothing.Image = Convert.FromBase64String(Image);

            try
            {
                _context.Clothings.Update(oldClothing);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClothingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // GET: api/Clothings/fav
        [HttpGet("fav")]
        public async Task<ActionResult<IEnumerable<Clothing>>> GetFavClothings()
        {
            return await _context.Clothings.Where(c => c.UserId == this.User.FindFirst(ClaimTypes.NameIdentifier).Value && c.isFavorite == true).Include(c => c.Tags).ToListAsync();
        }

        // PUT: api/Clothings/fav/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("fav/{id}")]
        public async Task<IActionResult> PutClothing(int? id, Dictionary<String, bool> requestBody)
        {
            var oldClothing = await _context.Clothings.FindAsync(id);

            //if this clothing does not belong to the user, return a 404
            if (oldClothing == null || oldClothing.UserId != this.User.FindFirst(ClaimTypes.NameIdentifier).Value)
            {
                return NotFound();
            }

            requestBody.TryGetValue("isFavorite", out bool isFavorite);

            oldClothing.isFavorite = isFavorite;

            try
            {
                _context.Clothings.Update(oldClothing);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClothingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();  
        }


        // DELETE: api/Clothings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClothing(int? id)
        {
            var oldClothing = await _context.Clothings.FindAsync(id);

            //if this clothing does not belong to the user, return a 404
            if (oldClothing == null || oldClothing.UserId != this.User.FindFirst(ClaimTypes.NameIdentifier).Value)
            {
                return NotFound();
            }

            _context.Clothings.Remove(oldClothing);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClothingExists(int? id)
        {
            return _context.Clothings.Any(e => e.Id == id);
        }
    }
}
