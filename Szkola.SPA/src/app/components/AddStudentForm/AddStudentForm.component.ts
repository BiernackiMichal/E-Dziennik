import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ClassService } from '../../_services/Class.service';
import { AuthStudentService } from '../../_services/authStudent.service';
import {ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-student-form',
  templateUrl: './AddStudentForm.component.html',
  styleUrls: ['./AddStudentForm.component.css']
})
export class AddStudentFormComponent {

constructor(private authStudentService: AuthStudentService, private toastr: ToastrService, private router: Router) {}

private studentForm = new FormGroup({
  firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  schoolClass: new FormControl('', Validators.required),
  birthDate: new FormControl('', Validators.required),
  address: new FormControl('', Validators.required),
  phone: new FormControl('', Validators.required),
  username: new FormControl('', [Validators.required, Validators.minLength(4) , Validators.maxLength(20)]),
  password: new FormControl('', [Validators.required, Validators.minLength(6) , Validators.maxLength(12)])
});

get student() {
  return this.studentForm;
}

getFormControl(formControlName: string) {
  return this.studentForm.get(formControlName) as FormControl;
}


registerStudent() {
  this.authStudentService.register(this.studentForm.value).subscribe(
    () => {
    this.showSuccessMessage();
    this.navigateToAdminPanel();
    },
    error => {
      this.showFailMessage(error);
      console.log(error);
    });
}

private showSuccessMessage() {
  this.toastr.success('Rejestracja ucznia udana');
}

private navigateToAdminPanel() {
  setTimeout(() => { this.router.navigate([ '/admin-panel']) ; }, 1500);
}

private showFailMessage(error) {
  this.toastr.error(error.error);
}
}
