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
    public class AuthTeacherController : ControllerBase
    {
        private readonly IAuthTeacherRepository _repository;
        private readonly IConfiguration _config;
        private readonly DataContext _context;

        public AuthTeacherController(IAuthTeacherRepository repository, IConfiguration config, DataContext context)
        {
            _config = config;
            _repository = repository;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterTeacher(TeacherForRegisterDto teacherForRegisterDto)
        {
            teacherForRegisterDto.Username = teacherForRegisterDto.Username;
            
            if (await _repository.UserExists(teacherForRegisterDto.Username))
            {
                return BadRequest("Użytkownik o takiej nazwie już istnieje !");
            }
            var subject =  _context.Subjects.FirstOrDefault(x => x.Name == teacherForRegisterDto.Subject);
            if (subject == null)
            {
                return BadRequest("Nie ma takiego przedmiotu");
            }
            var teacherToCreate = new Teacher
            {
                Username = teacherForRegisterDto.Username,
                FirstName = teacherForRegisterDto.FirstName,
                LastName = teacherForRegisterDto.LastName,
                Phone = teacherForRegisterDto.Phone,
                Email = teacherForRegisterDto.Email,
                SubjectID = subject.SubjectID,
                UserRole = "Teacher"
                
            };

            var createdUser = await _repository.Register(teacherToCreate, teacherForRegisterDto.Password);
            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(TeacherForLoginDto teacherForLoginDto)
        {
            var teacherFromRepository = await _repository.Login(teacherForLoginDto.Username, teacherForLoginDto.Password);
            

            if (teacherFromRepository == null)
                return Unauthorized("Niepoprawna nazwa użytkownika, lub hasło");
            

            //create Token
            var claims = new[]

            {   new Claim("SubjectID", teacherFromRepository.SubjectID.ToString()),
                new Claim("LastName", teacherFromRepository.LastName),
                new Claim("FirstName", teacherFromRepository.FirstName),
                new Claim("UserRole" , teacherFromRepository.UserRole),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);    

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
