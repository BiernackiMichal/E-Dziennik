import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SubjectService } from 'src/app/_services/Subject.service';
@Component({
  selector: 'app-delete-subject-form',
  templateUrl: './DeleteSubjectForm.component.html',
  styleUrls: ['./DeleteSubjectForm.component.css']
})
export class DeleteSubjectFormComponent {

  constructor(@Inject(MAT_DIALOG_DATA) private subjectToDelete, private subjectService: SubjectService, private toastr: ToastrService) { }

get subject() {
  return this.subjectToDelete;
}
deleteSubject() {
 this.subjectService.deleteSubject(this.subject.subjectID).subscribe(
  () => {
   this.showSuccessMessage();
  },
  error => {
   this.showFailMessage(error);
  });
}

showSuccessMessage() {
  this.toastr.success('usunięto');
}

showFailMessage(error) {
  this.toastr.error('Błąd'),
  console.log(error);
}

}
