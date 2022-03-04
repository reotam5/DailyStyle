#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    [EnableCors("CorsPolicy")]
    public class ClothingsImageController : ControllerBase
    {
        private readonly DailyStyleDBContext _context;

        public ClothingsImageController(DailyStyleDBContext context)
        {
            _context = context;
        }

        // GET: api/ClothingsImage
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClothingImage>>> GetClothingImage()
        {
            return await _context.ClothingImage.ToListAsync();
        }

        // GET: api/ClothingsImage/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClothingImage>> GetClothingImage(int? id)
        {
            var clothingImage = await _context.ClothingImage.FindAsync(id);

            if (clothingImage == null)
            {
                return NotFound();
            }

            return clothingImage;
        }

        // PUT: api/ClothingsImage/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClothingImage(int? id, ClothingImage clothingImage)
        {
            if (id != clothingImage.Id)
            {
                return BadRequest();
            }

            _context.Entry(clothingImage).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClothingImageExists(id))
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

        // POST: api/ClothingsImage
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ClothingImage>> PostClothingImage(ClothingImage clothingImage)
        {
            _context.ClothingImage.Add(clothingImage);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClothingImage", new { id = clothingImage.Id }, clothingImage);
        }

        // DELETE: api/ClothingsImage/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClothingImage(int? id)
        {
            var clothingImage = await _context.ClothingImage.FindAsync(id);
            if (clothingImage == null)
            {
                return NotFound();
            }

            _context.ClothingImage.Remove(clothingImage);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClothingImageExists(int? id)
        {
            return _context.ClothingImage.Any(e => e.Id == id);
        }
    }
}
