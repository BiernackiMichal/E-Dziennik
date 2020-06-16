using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Szkola.API.Models;

namespace Szkola.API.Data
{
    public class AuthStudentRepository : IAuthStudentRepository
    {
        private readonly DataContext _context;

        public AuthStudentRepository (DataContext context)
        {
            _context = context;
        }


        public async Task<Student> Login(string username, string password)
        {
            var student = await _context.Students.FirstOrDefaultAsync(x => x.Username == username );

            if (student == null)
            {
                return null;
            }
           if (!VerifyPasswordHash(password, student.PasswordHash, student.PasswordSalt))
           {
                return null;
           }
                
            student.SchoolClass = await _context.Classes.FirstOrDefaultAsync(x => x.ClassID == student.SchoolClassID);
            return student;
        }

  

        public async Task<Student> Register(Student student, string password)
        {
            byte[] passwordHash, passwordSalt ;


            CreatePasswordHashSalt(password, out passwordHash, out passwordSalt);

            student.PasswordHash = passwordHash;
            student.PasswordSalt = passwordSalt;
           
          
            await _context.Students.AddAsync(student);
            await _context.SaveChangesAsync();

            return student;
        }

        public async Task<bool> UserExists(string username)
        {
            if (await _context.Students.AnyAsync(x => x.Username.ToLower() == username.ToLower()))
            {
                return true;
            }
            return false;
        }







        private void CreatePasswordHashSalt(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {   
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

            }
            

        }
        

        private bool VerifyPasswordHash(string password,byte[] passwordHash, byte[] passwordSalt)
        {
                using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
              var  computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

              for (int i = 0; i < computedHash.Length; i++)
              {
                  if (computedHash[i] != passwordHash[i])
                  {
                      return false;
                  }

              }
              return true;
 
            }
        }
        
    }

}