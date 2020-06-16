import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubjectService } from 'src/app/_services/Subject.service';

@Component({
  selector: 'app-add-subject-form',
  templateUrl: './AddSubjectForm.component.html',
  styleUrls: ['./AddSubjectForm.component.css']
})
export class AddSubjectFormComponent {

constructor(public subjectService: SubjectService, private toastr: ToastrService, private router: Router) {}

private addSubjectForm = new FormGroup({
  name: new FormControl('', Validators.required),
  description: new FormControl('', Validators.required)
});

get subject() {
  return this.addSubjectForm;
}

getFormControl(formControlName: string) {
  return this.addSubjectForm.get(formControlName) as FormControl;
}

addSubject() {
  this.subjectService.addSubject(this.addSubjectForm.value).subscribe(x => {
  this.showSuccessToastr();
  this.navigateToAdminPanel();
  });
}

private navigateToAdminPanel() {
  setTimeout(() => { this.router.navigate([ '/admin-panel']) ; }, 1500);
}
private showSuccessToastr() {
  this.toastr.success('Pomyślnie dodano przedmiot');
}

}
