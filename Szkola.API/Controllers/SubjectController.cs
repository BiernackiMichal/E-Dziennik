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
    public class SubjectController : ControllerBase
    {
        private readonly DataContext _context;

        public SubjectController(DataContext context)
        {
            _context = context;
        }
        
   

        [HttpGet("{id}")]
        public IActionResult GetSubject (int id)
        {
            var subject = _context.Subjects.FirstOrDefault(x => x.SubjectID == id);
            return Ok(subject);
        }
        [HttpGet]
        public async Task<IActionResult> GetSubjects() {
            var subjects = await _context.Subjects.ToListAsync();
            return Ok(subjects);
        }
        [HttpPost]
        public async Task <IActionResult> AddSubject([FromBody] Subject subject)
        {
            _context.Subjects.Add(subject);
            await _context.SaveChangesAsync();
            return Ok(subject);
        }        
        
        [HttpPut("{id}")]
        public async Task<IActionResult> EditSubject(int id, [FromBody] Subject subject)
        {
            var subjectById = await _context.Subjects.FindAsync(id);
            subjectById.Name = subject.Name;
            subjectById.Description = subject.Description;
            _context.Subjects.Update(subjectById);
            await _context.SaveChangesAsync();
            return Ok(subjectById);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubject(int id) {
            var subject = await _context.Subjects.FindAsync(id);
            _context.Subjects.Remove(subject);
            await _context.SaveChangesAsync();
            return Ok(subject);            
        }
        
    }
}
    
