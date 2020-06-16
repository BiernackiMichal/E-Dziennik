import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthTeacherService } from 'src/app/_services/authTeacher.service';

@Component({
  selector: 'app-add-teacher-form',
  templateUrl: './AddTeacherForm.component.html',
  styleUrls: ['./AddTeacherForm.component.css']
})
export class AddTeacherFormComponent  {

constructor(private authTeacherService: AuthTeacherService, private toastr: ToastrService, private router: Router) {}

private addTeacherForm = new FormGroup({
  firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  subject: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.minLength(100)]),
  phone: new FormControl('', Validators.maxLength(100)),
  username: new FormControl('', [Validators.required, Validators.minLength(4) , Validators.maxLength(20)]),
  password: new FormControl('', [Validators.required, Validators.minLength(6) , Validators.maxLength(12)])
});

get teacher() {
  return this.addTeacherForm;
}

registerTeacher() {
  this.authTeacherService.register(this.addTeacherForm.value).subscribe(
    ()  => {
    this.showSuccessMessage();
    this.navigateToAdminPanel();
  },
    error => {this.showFailMessage(error);
  });
}

private showSuccessMessage() {
  this.toastr.success('Pomyślnie zarejestrowano nauczyciela');
}

private showFailMessage(error) {
  this.toastr.error(error.error);
}

private navigateToAdminPanel() {
  setTimeout(() => { this.router.navigate([ '/admin-panel']) ; }, 1500);
}

}
