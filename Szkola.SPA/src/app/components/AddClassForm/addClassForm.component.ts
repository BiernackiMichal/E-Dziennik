import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClassService } from 'src/app/_services/Class.service';


@Component({
  selector: 'app-add-class-form',
  templateUrl: './addClassForm.component.html',
  styleUrls: ['./addClassForm.component.css']
})
export class AddClassFormComponent {

constructor(private classService: ClassService, private toastr: ToastrService, private router: Router) {}

addClassForm = new FormGroup({
  name:  new FormControl(null, [Validators.required, Validators.maxLength(50)]),
  description: new FormControl(null, [Validators.required, Validators.maxLength(300)]),
  educator: new FormControl(null, Validators.required)
});

getFormControl(FormControlName: string) {
  return this.addClassForm.get(FormControlName) as FormControl;
}

addClass() {
  this.classService.addClass(this.addClassForm.value ).subscribe(
    () => {
      this.showSuccessToastr();
      this.navigateToAdminPanel();
      },
    error => {
      console.log(error);
      this.showFailMessage(error);
    });
}

private showSuccessToastr() {
  this.toastr.success('Pomyślnie dodano klasę');
}

private navigateToAdminPanel() {
  setTimeout(() => { this.router.navigate([ '/admin-panel']) ; }, 1500);
}

private showFailMessage(error) {
  this.toastr.error(error.error);
}
}
