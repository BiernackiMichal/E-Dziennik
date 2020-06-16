using Microsoft.EntityFrameworkCore;
using Szkola.API.Models;

namespace Szkola.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}

        public DbSet<Grade> Grades { get; set; }
        public DbSet<SchoolClass> Classes { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Teacher> Teachers { get; set; }

        
    }
}