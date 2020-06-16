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
    public class StudentController : ControllerBase
    {
        private readonly DataContext _context;

        public StudentController(DataContext context)
        {
            _context = context;
        }
        
        [HttpGet("[action]/{id}")]
        public async Task <IActionResult> GetStudentsByClassId (int id)
        {
            var students = await  _context.Students.Where(x => x.SchoolClassID == id).ToListAsync();
            return Ok(students);
        }


        [HttpGet("{id}")]
        public async Task <IActionResult> GetStudent (int id)
        {
            var student = await _context.Students.FirstOrDefaultAsync(x => x.StudentID == id);
            return Ok(student);
        }
        

        [HttpPut("{id}")]
        public async Task<IActionResult> EditStudent(int id, [FromBody] Student student)
        {
            var studentById = await _context.Students.FindAsync(id);
            studentById.FirstName = student.FirstName;
            studentById.LastName = student.LastName;
            studentById.BirthDate = student.BirthDate;
            studentById.Phone = student.Phone;
            studentById.Address = student.Address;
            _context.Students.Update(studentById);
            await _context.SaveChangesAsync();
            return Ok(studentById);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudentWithGrades(int id) {
            var studentById = await _context.Students.FindAsync(id);
            if(studentById == null)
            {
                return NoContent();
            }
            var studentGrades = await _context.Grades.Where(x => x.StudentID == id).ToListAsync();
            foreach (var grade in studentGrades)
            {
                 _context.Grades.Remove(grade);
            }
           
            _context.Students.Remove(studentById);

            await _context.SaveChangesAsync();
            return Ok(studentById);    
       }
    }
}