using System.Threading.Tasks;
using Szkola.API.Models;

namespace Szkola.API.Data
{
    public interface IAuthStudentRepository
    {
         Task<Student> Login(string username, string password);
         Task<Student> Register(Student student, string password);
         Task<bool> UserExists(string username);
    }
}