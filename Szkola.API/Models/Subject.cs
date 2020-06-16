using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Szkola.API.Models
{
    public class Subject
    {   
        [Key]
        public int SubjectID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [MaxLength(300)]
        public string Description { get; set; }
        
        public IList<Grade> Degrees { get; set; }

        
    }
}