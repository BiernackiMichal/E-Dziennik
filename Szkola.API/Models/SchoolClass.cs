using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Szkola.API.Models
{
    public class SchoolClass
    {   
        [Key]
        public int ClassID { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(300)]
        public string Description { get; set; }

        [Required]
        [MaxLength(50)]
        public string Educator { get; set; }

        public IList<Student> Student { get; set; }
        
    }
}