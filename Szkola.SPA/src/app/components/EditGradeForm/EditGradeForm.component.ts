import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GradeService } from 'src/app/_services/Grade.service';

@Component({
  selector: 'app-editgradeform',
  templateUrl: './EditGradeForm.component.html',
  styleUrls: ['./EditGradeForm.component.css']
})
export class EditGradeFormComponent {

constructor(@Inject(MAT_DIALOG_DATA) private grade: any, private gradeService: GradeService, private toastr: ToastrService) { }

public readonly rates: Array<number> = [1, 2, 3];
private gradeValuePattern = '^(np|1|1\\+|2|2\-|2\\+|3|3\-|3\\+|4|4\-|4\\+|5|5\\+|5\-|6)$' ;

editGradeForm = new FormGroup({
  description: new FormControl(this.grade.description,  [Validators.required, Validators.maxLength(100)]),
  rate: new FormControl(this.grade.rate, [Validators.required]),
  value: new FormControl(this.grade.value, [Validators.required, Validators.pattern(this.gradeValuePattern)]),
  studentID: new FormControl (this.grade.studentID),
  subjectID: new FormControl( this.grade.subjectID),
  dateTime: new FormControl(this.grade.dateTime),
  id: new FormControl(this.grade.id)
});

getSubjectName() {
  return this.grade.subject.name;
}

getFormControl(FormControlName: string): FormControl {
  return this.editGradeForm.get(FormControlName) as FormControl;
}


editGrade(): void {
  this.gradeService.editGrade(this.editGradeForm.value).subscribe(
  () => {
  this.toastr.success('Edycja oceny przebiegła pomyślnie');
  },
  error => {
    console.log(error);
    this.toastr.error(error.error);
  });
}

deleteGrade(): void {
  this.gradeService.deleteGrade(this.grade).subscribe(
  () => {
  this.toastr.success('Ocena usunięta');
  },
  error => {
    console.log(error);
    this.toastr.error(error.error);
  });
}

}
