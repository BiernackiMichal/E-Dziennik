import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TeacherService } from 'src/app/_services/teacher.service';
import { ITeacher } from 'src/app/shared/_Interfaces/ITeacher';

@Component({
  selector: 'app-edit-teacher-form',
  templateUrl: './EditTeacherForm.component.html',
  styleUrls: ['./EditTeacherForm.component.css']
})
export class EditTeacherFormComponent {

constructor(@Inject(MAT_DIALOG_DATA) private teacher: ITeacher, private teacherService: TeacherService, private toastr: ToastrService) { }

editTeacherForm: FormGroup = new FormGroup({
  teacherID: new FormControl(this.teacher.teacherID, Validators.required),
  phone: new FormControl(this.teacher.phone, Validators.required),
  subjectID: new FormControl(this.teacher.subjectID, [Validators.pattern('^[0-9]*$'), Validators.required]),
  userRole: new FormControl(this.teacher.userRole),
  email: new FormControl(this.teacher.email, Validators.required),
  lastName: new FormControl(this.teacher.lastName, Validators.required),
  firstName: new FormControl(this.teacher.firstName, Validators.required),
  passwordHash: new FormControl('password'),
  passwordSalt: new FormControl('password'),
  username: new FormControl('username')
});

editTeacher() {
  console.log(this.teacher);
  this.teacherService.editTeacher(this.editTeacherForm.value).subscribe(
  () => {
    this.toastr.success('Edycja nauczyciela przebiegła pomyślnie');
  },
  error => {
    this.toastr.error(error.error);
    console.log(error);
  });
}
}
