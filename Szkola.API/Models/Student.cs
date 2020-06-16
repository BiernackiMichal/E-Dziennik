using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Szkola.API.Models
{
     public class Student
    
    {   [Key]
        public int StudentID { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

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
        [DataType(DataType.Date)]
        [Column(TypeName = "Date")]
        public DateTime BirthDate { get; set; }

        [Required]
        [MaxLength(100)]
        public string Address { get; set; }

        [Required]
        [MaxLength(30)]
        public string Phone { get; set; }

        public IList<Grade> Degrees { get; set; }


        [ForeignKey("SchoolClass")]
        public int SchoolClassID { get; set; }

        public SchoolClass SchoolClass { get; set; }
    }
}