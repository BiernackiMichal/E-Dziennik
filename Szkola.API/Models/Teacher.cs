using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Szkola.API.Models
{
    public class Teacher
    {   
        [Key]
        public int TeacherID { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [MaxLength(100)]
        public string Email { get; set; }

        [Required]
        [MaxLength(50)]
        public string Username { get; set; }

        [Required]
        public byte[] PasswordHash { get; set; }

        [Required]
        public byte[] PasswordSalt { get; set; }

        [Required]
        [MaxLength(20)]
        public string UserRole {get; set;}

        [Required]
        [MaxLength(30)]
        public string Phone { get; set; }

        [ForeignKey("Subject")]
        public int SubjectID { get; set; }
        public Subject Subject { get; set; }


    }
}