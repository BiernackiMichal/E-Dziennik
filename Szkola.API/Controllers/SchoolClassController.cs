using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Szkola.API.Data;
using Szkola.API.Models;

namespace Szkola.API.Controllers
{   [Route("api/[controller]")]
    [ApiController]
    public class SchoolClassController : ControllerBase
    {
        private readonly DataContext _context;

        public SchoolClassController(DataContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetClasses ()
        {
            var classes = await _context.Classes.ToListAsync();
            return Ok(classes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetClass (int id)
        {
            var classById =await _context.Classes.FirstOrDefaultAsync(x => x.ClassID == id);
            return Ok(classById);
        }

        [HttpPost]
        public async Task <IActionResult> AddClass([FromBody] SchoolClass schoolClass)
        {  
            var teacher = await _context.Teachers.FirstOrDefaultAsync(x => (x.FirstName + x.LastName).Trim()
            .ToLower() == schoolClass.Educator.Replace(" ", "").Trim().ToLower());
            if(teacher == null) {
                return BadRequest(" Nie znaleziono nauczyciela o takim imieniu i nazwisku.");
            }
            schoolClass.Educator = teacher.FirstName + " " + teacher.LastName;
            _context.Classes.Add(schoolClass);
            await _context.SaveChangesAsync();
            return Ok(schoolClass);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditClass(int id, [FromBody] SchoolClass schoolClass)
        { 
            var teacher = await _context.Teachers.FirstOrDefaultAsync(x => (x.FirstName + x.LastName).Trim()
            .ToLower() == schoolClass.Educator.Replace(" ", "").Trim().ToLower());

            if(teacher == null) {
                return BadRequest(" Nie znaleziono nauczyciela o takim imieniu i nazwisku.");
            }
            var classById = await _context.Classes.FindAsync(id);
                classById.Name = schoolClass.Name;
                classById.Description = schoolClass.Description;
                classById.Educator = teacher.FirstName + " " + teacher.LastName;
                _context.Classes.Update(classById);
                await _context.SaveChangesAsync();
                return Ok(classById);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClass(int id) {
          var classById = await _context.Classes.FindAsync(id);
          if(classById == null)
          {
            return NoContent();
          }
          _context.Classes.Remove(classById);
          await _context.SaveChangesAsync();
          return Ok(classById);
        }
    }
}