import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TeacherService } from 'src/app/_services/teacher.service';

@Component({
  selector: 'app-delete-teacher-form',
  templateUrl: './DeleteTeacherForm.component.html',
  styleUrls: ['./DeleteTeacherForm.component.css']
})
export class DeleteTeacherFormComponent {


  constructor(@Inject(MAT_DIALOG_DATA) private teacherToDelete, private teacherService: TeacherService, private toastr: ToastrService) { }

get teacher() {
  return this.teacherToDelete;
}

deleteTeacher() {
 this.teacherService.deleteTeacher(this.teacher.teacherID).subscribe(
  () => {
    this.showSuccessMessage();
  },
  error => {
    this.showFailMessage(error);
  },
 );
}
showSuccessMessage() {
  this.toastr.success('usunięto');
}

showFailMessage(error) {
  this.toastr.error('Błąd'),
  console.log(error);
}

}
