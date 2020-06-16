using System.Threading.Tasks;
using Szkola.API.Models;

namespace Szkola.API.Data
{
    public interface IAuthTeacherRepository
    {
         Task<Teacher> Login(string username, string password);
         Task<Teacher> Register(Teacher teacher, string password);
         Task<bool> UserExists(string username);
    }
}