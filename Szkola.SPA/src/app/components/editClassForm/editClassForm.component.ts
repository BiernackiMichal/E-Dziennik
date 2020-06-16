import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IClass } from 'src/app/shared/_Interfaces/IClass';
import { ClassService } from 'src/app/_services/Class.service';

@Component({
  selector: 'app-edit-class-form',
  templateUrl: './editClassForm.component.html',
  styleUrls: ['./editClassForm.component.css']
})
export class EditClassFormComponent {

  constructor(@Inject(MAT_DIALOG_DATA) private schoolClassToEdit: IClass, private schoolClassService: ClassService,
              private toastr: ToastrService) { }

schoolClassForm: FormGroup = new FormGroup({
  name: new FormControl(this.schoolClassToEdit.name, Validators.required),
  description: new FormControl(this.schoolClassToEdit.description, Validators.required),
  educator: new FormControl(this.schoolClassToEdit.educator, Validators.required),
  classID: new FormControl (this.schoolClassToEdit.classID)
});

get schoolClassName(): string {
  return this.schoolClassToEdit.name;
}

deleteClass(): void {
 this.schoolClassService.deleteClass(this.schoolClassForm.value).subscribe(
  () => {
    this.toastr.success('Usunięto klasę');
  },
  error => {
    this.toastr.error(error.error);
    console.log(error);
  });
}

editClass(): void {
  this.schoolClassService.editClass(this.schoolClassForm.value).subscribe(
    () => {
      this.toastr.success('Edycja klasy przebiegła pomyślnie');
    },
    error => {
      console.log(error);
      this.toastr.error(error.error);
    });
}

getFormControl(formControlName: string) {
  return this.schoolClassForm.get(formControlName) as FormControl;
}
}
