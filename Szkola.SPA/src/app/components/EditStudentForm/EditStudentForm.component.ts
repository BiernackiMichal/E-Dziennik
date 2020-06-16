import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from 'src/app/_services/Student.service';
import { IStudent } from 'src/app/shared/_Interfaces/IStudent';

@Component({
  selector: 'app-edit-student-form',
  templateUrl: './EditStudentForm.component.html',
  styleUrls: ['./EditStudentForm.component.css']
})
export class EditStudentFormComponent {

  constructor(@Inject(MAT_DIALOG_DATA)private student: IStudent, private studentService: StudentService, private toastr: ToastrService) { }

editStudentForm: FormGroup = new FormGroup({
  firstName: new FormControl(this.student.firstName, [Validators.required, Validators.maxLength(50)]),
  lastName: new FormControl(this.student.lastName, [Validators.required, Validators.maxLength(50)]),
  birthDate: new FormControl(this.student.birthDate, Validators.required),
  address: new FormControl(this.student.address, Validators.required),
  phone: new FormControl(this.student.phone, Validators.required),
  studentID: new FormControl(this.student.studentID),
  userRole: new FormControl('userRole'),
  username: new FormControl('username'),
  passwordHash: new FormControl('password'),
  passwordSalt: new FormControl('password')

});

editStudent(): void {
  this.studentService.editStudent(this.editStudentForm.value).subscribe(
    () => {
      this.toastr.success('Edycja ucznia przebiegła pomyślnie');
    },
    error => {
      console.log(error);
      this.toastr.error(error.error);
    }
  );
}

deleteStudent(): void {
  this.studentService.deleteStudent(this.student.studentID).subscribe(() =>
    this.toastr.success('Uczeń usunięty'),
    error => console.log(error));
}

getFormControl(FormControlName: string): FormControl {
  return this.editStudentForm.get(FormControlName) as FormControl;
}
}
