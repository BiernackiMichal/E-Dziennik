using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Szkola.API.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.Extensions.Configuration;
using System;
using Szkola.API.Dtos;
using Szkola.API.Data;
using System.Linq;

namespace Szkola.API.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class AuthStudentController : ControllerBase
    {
        private readonly IAuthStudentRepository _repository;
        private readonly IConfiguration _config;
        private readonly DataContext _context;

        public AuthStudentController(IAuthStudentRepository repository, IConfiguration config, DataContext context)
        {
            _config = config;
            _repository = repository;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterStudent(StudentForRegisterDto studentForRegisterDto)
        {
            studentForRegisterDto.Username = studentForRegisterDto.Username;
              if (await _repository.UserExists(studentForRegisterDto.Username))
            {
                return BadRequest("Użytkownik o takiej nazwie już istnieje !");
            }
            var schoolClass =  _context.Classes.FirstOrDefault(x => x.Name == studentForRegisterDto.SchoolClass);
            if( schoolClass == null) {
               return BadRequest("Nie ma takiej klasy");
            }
            var studentToCreate = new Student
            {
                Username = studentForRegisterDto.Username,
                FirstName = studentForRegisterDto.FirstName,
                LastName = studentForRegisterDto.LastName,
                BirthDate = studentForRegisterDto.BirthDate,
                Address = studentForRegisterDto.Address,
                Phone = studentForRegisterDto.Phone,
                SchoolClassID = schoolClass.ClassID,
                UserRole = "Student"
                
            };

            var createdUser = await _repository.Register(studentToCreate, studentForRegisterDto.Password);
            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(StudentForLoginDto studentForLoginDto)
        {
            var studentFromRepository = await _repository.Login(studentForLoginDto.Username, studentForLoginDto.Password);
            

            if (studentFromRepository == null)
                return Unauthorized("Niepoprawna nazwa użytkownika, lub hasło");
            
            
            //create Token
            var claims = new[]
            {   
                new Claim("LastName", studentFromRepository.LastName),
                new Claim("FirstName", studentFromRepository.FirstName),
                new Claim("ClassName", studentFromRepository.SchoolClass.Name),
                new Claim("UserRole" , studentFromRepository.UserRole),
                new Claim("StudentID", studentFromRepository.StudentID.ToString()),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);    

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddHours(10),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new {token = tokenHandler.WriteToken(token)});
        }  

    }
}
