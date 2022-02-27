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

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClothingTagsController : ControllerBase
    {
        private readonly DailyStyleDBContext _context;

        public ClothingTagsController(DailyStyleDBContext context)
        {
            _context = context;
        }

        // GET: api/ClothingTags
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClothingTag>>> GetClothingTags()
        {
            return await _context.ClothingTags.ToListAsync();
        }

        // GET: api/ClothingTags/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClothingTag>> GetClothingTag(int id)
        {
            var clothingTag = await _context.ClothingTags.FindAsync(id);

            if (clothingTag == null)
            {
                return NotFound();
            }

            return clothingTag;
        }

        // PUT: api/ClothingTags/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClothingTag(int id, ClothingTag clothingTag)
        {
            if (id != clothingTag.ClothingId)
            {
                return BadRequest();
            }

            _context.Entry(clothingTag).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClothingTagExists(id))
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

        // POST: api/ClothingTags
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ClothingTag>> PostClothingTag(ClothingTag clothingTag)
        {
            _context.ClothingTags.Add(clothingTag);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ClothingTagExists(clothingTag.ClothingId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetClothingTag", new { id = clothingTag.ClothingId }, clothingTag);
        }

        // DELETE: api/ClothingTags/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClothingTag(int id)
        {
            var clothingTag = await _context.ClothingTags.FindAsync(id);
            if (clothingTag == null)
            {
                return NotFound();
            }

            _context.ClothingTags.Remove(clothingTag);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClothingTagExists(int id)
        {
            return _context.ClothingTags.Any(e => e.ClothingId == id);
        }
    }
}
