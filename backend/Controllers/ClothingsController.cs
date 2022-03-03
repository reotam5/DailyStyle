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
using backend.Filters;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    [AuthFilter]
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
        public async Task<ActionResult<Clothing>> PostClothing(Dictionary<String, String> requestBody)
        {
            var re = Request;
            var headers = re.Headers;
            headers.TryGetValue("token", out var Token);

            requestBody.TryGetValue("Title", out string Title);
            requestBody.TryGetValue("Description", out string Description);
            requestBody.TryGetValue("Image", out string Image);

            User user = await _context.GetUserByToken(Token);

            Clothing clothing = new Clothing();
            clothing.UserId = user.Id;
            clothing.Title = Title;
            clothing.Description = Description;
            clothing.Image = Convert.FromBase64String(Image);


            _context.Clothings.Add(clothing);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClothing", new { id = clothing.Id }, clothing);
        }


        // GET: api/Clothings
        // This get route will get all clothings for A user
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Clothing>>> GetClothings()
        {
            var re = Request;
            var headers = re.Headers;
            headers.TryGetValue("token", out var Token);

            User user = await _context.GetUserByToken(Token);

            return await _context.Clothings.Where(c=>c.UserId == user.Id).ToListAsync();
        }

        // GET: api/Clothings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Clothing>> GetClothing(int? id)
        {
            var re = Request;
            var headers = re.Headers;
            headers.TryGetValue("token", out var Token);

            User user = await _context.GetUserByToken(Token);

            var clothing = await _context.Clothings.FindAsync(id);

            //if this clothing does not belong to the user, return a 404
            if (clothing == null || clothing.UserId != user.Id)
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
            var re = Request;
            var headers = re.Headers;
            headers.TryGetValue("token", out var Token);

            User user = await _context.GetUserByToken(Token);

            var oldClothing = await _context.Clothings.FindAsync(id);

            //if this clothing does not belong to the user, return a 404
            if (oldClothing == null || oldClothing.UserId != user.Id)
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


        // DELETE: api/Clothings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClothing(int? id)
        {
            var re = Request;
            var headers = re.Headers;
            headers.TryGetValue("token", out var Token);

            User user = await _context.GetUserByToken(Token);

            var oldClothing = await _context.Clothings.FindAsync(id);

            //if this clothing does not belong to the user, return a 404
            if (oldClothing == null || oldClothing.UserId != user.Id)
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
