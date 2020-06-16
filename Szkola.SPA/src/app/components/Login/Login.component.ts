import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthTeacherService } from 'src/app/_services/authTeacher.service';
import { Navigation } from 'src/app/shared/navigation/Navigation';
import { UserRole } from 'src/app/shared/enums/userRole.enum';
import { AuthStudentService } from 'src/app/_services/authStudent.service';

@Component({
  selector: 'app-login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent {

constructor(private authTeacherService: AuthTeacherService , private  authStudentService: AuthStudentService,
            private toastr: ToastrService, private navigate: Navigation ) {}

private spinner = false;

get IsSpinnerVisible(): boolean {
  return this.spinner;
}

userForm: FormGroup = new FormGroup({
  username: new FormControl('', Validators.required),
  password: new FormControl('', Validators.required),
  userRole: new FormControl('', Validators.required)
});

login(): void {
  this.showSpinner();
  this.loginUser();
}

private loginUser(): void {
  if (this.isUserAStudent()) {
    this.loginStudent();
  }
  if (this.isUserATeacher()) {
    this.loginTeacher();
  }
}

private isUserAStudent(): boolean {
  return this.getFormControl('userRole').value === UserRole.STUDENT;
}

private isUserATeacher(): boolean {
  return this.getFormControl('userRole').value === UserRole.TEACHER;
}
private showSuccessMessage(): void {
  this.toastr.success('Zalogowano');
}

private showSpinner(): void {
  this.spinner = true;
}

private hideSpinner(): void {
  this.spinner = false;
}

private loginStudent(): void {
  this.authStudentService.login(this.userForm.value).subscribe(
    () =>  {
      this.showSuccessMessage();
      this.navigate.navigateToWithTimeOut('/subjects');
      this.hideSpinner();
    },
    error => {
      console.log(error);
      this.toastr.error(error.error);
      this.hideSpinner();
    }
  );
}

private loginTeacher(): void {
  this.authTeacherService.login(this.userForm.value).subscribe(
    () =>  {
      this.showSuccessMessage();
      this.navigate.navigateToWithTimeOut('/classes');
      this.hideSpinner();
    },
    error => {
      console.log(error);
      this.toastr.error(error.error);
      this.hideSpinner();
    }
  );
}

getFormControl(FormControlName: string): FormControl {
  return this.userForm.get(FormControlName) as FormControl;
}

}
