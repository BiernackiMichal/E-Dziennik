using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Szkola.API.Data;
using Szkola.API.Models;

namespace Szkola.API.Controllers
{
     [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly DataContext _context;

        public TeacherController(DataContext context)
        {
            _context = context;
        }
        
        [HttpGet("{id}")]
        public async Task <IActionResult> GetTeacher (int id)
        {
            var teacher = await  _context.Teachers.FindAsync(id);
            return Ok(teacher);
        }


        [HttpGet]
        public async Task <IActionResult> GetTeachers (int id)
        {
            var teachers = await _context.Teachers.ToListAsync();
            return Ok(teachers);
        }
        

        [HttpPut("{id}")]
        public async Task<IActionResult> EditTeacher(int id, [FromBody] Teacher teacher)
        {
            var subject = await _context.Subjects.FirstOrDefaultAsync(x => x.SubjectID == teacher.SubjectID);

            if(subject == null) 
            {
                return BadRequest("Nie ma przedmiotu o takim ID");
            }

            var teacherById = await _context.Teachers.FindAsync(id);         
            teacherById.FirstName = teacher.FirstName;
            teacherById.LastName = teacher.LastName;
            teacherById.Email = teacher.Email;
            teacherById.Phone = teacher.Phone;
            teacherById.SubjectID = teacher.SubjectID;
            teacherById.UserRole = teacher.UserRole;
            
            _context.Teachers.Update(teacherById);
            await _context.SaveChangesAsync();
            return Ok(teacherById);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeacher(int id) {
            var teacherById = await _context.Teachers.FindAsync(id);
            if(teacherById == null)
            {
                return NoContent();
            }
            _context.Teachers.Remove(teacherById);
            await _context.SaveChangesAsync();
            return Ok(teacherById);    
       }
    }
}