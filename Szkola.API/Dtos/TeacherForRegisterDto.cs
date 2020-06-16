using System;
using System.ComponentModel.DataAnnotations;

namespace Szkola.API.Dtos
{
    public class TeacherForRegisterDto
    {   
        [Required(ErrorMessage="Nazwa użytkownika jest wymagana.")]
        [StringLength(20, MinimumLength=4, ErrorMessage="Nazwa użytkownika musi się składać od 4 do 20 znaków")]
        public string Username { get; set; }
        
        [Required(ErrorMessage ="Hasło jest wymagane.")]
        [StringLength(12, MinimumLength=6, ErrorMessage="Hasło musi się składać od 6 do 12 znaków")]
        public string Password { get; set; }
        
        [Required(ErrorMessage ="Imię jest wymagane.")]
        [StringLength(50, MinimumLength=1, ErrorMessage="Imię musi się składać od 1 do 50 znaków")]
        public string FirstName { get; set; }

        [Required(ErrorMessage ="Nazwisko jest wymagane.")]
        [StringLength(50, MinimumLength=1, ErrorMessage="Nazwisko musi się składać od 1 do 50 znaków")]
        public string LastName { get; set; }

        [StringLength(100, MinimumLength=1, ErrorMessage="Email musi się składać od 1 do 100 znaków")]
        public string Email { get; set; }

        public string Phone { get; set; }

        [Required(ErrorMessage ="Przedmiot jest wymagany.")]
        public string Subject { get; set; }
    } 
}