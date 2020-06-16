import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ISubject } from 'src/app/shared/_Interfaces/ISubject';
import { GradeService } from 'src/app/_services/Grade.service';
import { IGrade } from 'src/app/shared/_Interfaces/IGrade';

@Component({
  selector: 'app-addgradeform',
  templateUrl: './AddGradeForm.component.html',
  styleUrls: ['./AddGradeForm.component.css']
})
export class AddGradeFormComponent {

constructor(@Inject(MAT_DIALOG_DATA) private subject: ISubject, private gradeService: GradeService, private toastr: ToastrService) {

}

public readonly gradeRates: Array<number> = [1, 2, 3];
private currentDateTime = new Date();
private gradeToAdd: IGrade = {
  value: null,
  description: null,
  rate: null,
  studentID: null,
  subjectID: null,
  dateTime: null,
  subject: null
};

get grade() {
  return this.gradeToAdd;
}

addGrade(): void {
  this.setGradeProperties();
  this.gradeService.addGrade(this.grade).subscribe(() => {
  this.showSuccessToastr();
  });
}

private setGradeProperties() {
  this.setGradeSubjectID();
  this.setGradeStudentID();
  this.setGradeDateTime();
}

private setGradeSubjectID(): void {
  this.grade.subjectID = this.subject.subjectID;
}

private setGradeStudentID(): void {
  this.grade.studentID = localStorage.getItem('studentID');
}

private setGradeDateTime(): void {
  this.grade.dateTime = this.currentDateTime;
}

private showSuccessToastr(): void {
  this.toastr.success('Pomyślnie dodano ocenę');
}

get subjectName() {
  return this.subject.name;
}



}
