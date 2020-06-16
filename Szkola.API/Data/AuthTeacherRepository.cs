using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Szkola.API.Models;

namespace Szkola.API.Data
{
    public class AuthTeacherRepository : IAuthTeacherRepository
    {
        private readonly DataContext _context;

        public AuthTeacherRepository (DataContext context)
        {
            _context = context;
        }


        public async Task<Teacher> Login(string username, string password)
        {
            var teacher = await _context.Teachers.FirstOrDefaultAsync(x => x.Username == username );

            if (teacher == null)
            {
                return null;
            }
           if (!VerifyPasswordHash(password, teacher.PasswordHash, teacher.PasswordSalt))
                return null;

            return teacher;
        }

  

        public async Task<Teacher> Register(Teacher teacher, string password)
        {
            byte[] passwordHash, passwordSalt ;


            CreatePasswordHashSalt(password, out passwordHash, out passwordSalt);

            teacher.PasswordHash = passwordHash;
            teacher.PasswordSalt = passwordSalt;
           
          
            await _context.Teachers.AddAsync(teacher);
            await _context.SaveChangesAsync();

            return teacher;
        }

        public async Task<bool> UserExists(string username)
        {
            if (await _context.Teachers.AnyAsync(x => x.Username.ToLower() == username.ToLower()))
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