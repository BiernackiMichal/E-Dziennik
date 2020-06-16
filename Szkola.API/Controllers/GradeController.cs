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
    public class GradeController : ControllerBase
    {
        private readonly DataContext _context;

        public GradeController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task <IActionResult> GetGradeById (int id)
        {
            var grade = await _context.Students.FirstOrDefaultAsync(x => x.StudentID == id);
            return Ok(grade);
        }
        
        [HttpGet("[action]/{id}")]
        public IActionResult GetGradesWithSubjectsByStudentID (int id)
        {
            var subject =  _context.Grades.Where(x => x.StudentID == id).Include(s => s.Subject).ToList();
            return Ok(subject);
        }

        [HttpPost]
        public async Task <IActionResult> AddGrade([FromBody] Grade grade)
        {
            _context.Grades.Add(grade);
            await _context.SaveChangesAsync();
            return Ok(grade);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditGrade(int id, [FromBody] Grade grade) {
            var gradeById = await _context.Grades.FindAsync(id);
            gradeById.Value = grade.Value;
            gradeById.Description = grade.Description;
            gradeById.Rate = grade.Rate;
            _context.Grades.Update(gradeById);
            await _context.SaveChangesAsync();
            return Ok(gradeById);            
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGrade(int id) {
            var gradeById = await _context.Grades.FindAsync(id);

            if(gradeById == null)
            {
                return NoContent();
            }
            _context.Grades.Remove(gradeById);
            await _context.SaveChangesAsync();
            return Ok(gradeById);
        }
    }
 
}