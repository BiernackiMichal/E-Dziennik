import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import { ISubject } from 'src/app/shared/_Interfaces/ISubject';
import { SubjectService } from 'src/app/_services/Subject.service';

@Component({
  selector: 'app-edit-subject-form',
  templateUrl: './EditSubjectForm.component.html',
  styleUrls: ['./EditSubjectForm.component.css']
})
export class EditSubjectFormComponent {

  constructor(@Inject(MAT_DIALOG_DATA) private subject: ISubject, private subjectService: SubjectService, private toastr: ToastrService) { }

editSubjectForm: FormGroup = new FormGroup({
  name: new FormControl(this.subject.name),
  description: new FormControl(this.subject.description),
  subjectID: new FormControl(this.subject.subjectID)
});

getSubjectName(): string {
  return this.subject.name;
}


editSubject(): void {
 this.subjectService.editSubject(this.editSubjectForm.value).subscribe(
  () => {
   this.toastr.success('Edycja przedmiotu przebiegła pomyślnie');
  },
  error => {
    console.log(error);
  });
}

}
