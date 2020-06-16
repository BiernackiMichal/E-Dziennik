/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EditStudentFormComponent } from './EditStudentForm.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { StudentService } from 'src/app/_services/Student.service';

describe('EditStudentFormComponent', () => {
  let component: EditStudentFormComponent;
  let fixture: ComponentFixture<EditStudentFormComponent>;
  let studentServiceMock: any;

  beforeEach(async(() => {
    studentServiceMock = jasmine.createSpyObj('StudentService', ['editStudent']);
    studentServiceMock.editStudent.and.returnValue(of(''));

    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), FormsModule],
      declarations: [ EditStudentFormComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {}},
        { provide: MatDialogRef, useValue: {} },
        {provide: StudentService, useValue: studentServiceMock}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStudentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
