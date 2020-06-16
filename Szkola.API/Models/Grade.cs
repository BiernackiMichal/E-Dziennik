using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Szkola.API.Models
{
    public class Grade
    {   
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(3)]
        public string Value { get; set; }

        [Required]
        [MaxLength(100)]
        public string Description {get; set; }
        
        [Required]
        public int Rate { get; set; }


        [Required]
        [ForeignKey("Student")]
        public int StudentID { get; set; }
        public Student Student { get; set; }

        [Required]
        [ForeignKey("Subject")]
        public int SubjectID { get; set; }
        public Subject Subject { get; set; }

        [Required]
        [Column(TypeName = "Date")]
        public DateTime DateTime { get; set; }


        

    }
}