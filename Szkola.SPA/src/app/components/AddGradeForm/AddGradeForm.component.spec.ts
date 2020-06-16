/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AddGradeFormComponent } from './AddGradeForm.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { GradeService } from '../_services/Grade.service';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddGradeFormComponent', () => {
  let component: AddGradeFormComponent;
  let fixture: ComponentFixture<AddGradeFormComponent>;
  let gradeServiceMock: any;

  beforeEach(async(() => {
    gradeServiceMock = jasmine.createSpyObj('GradeService', ['addGrade']);
    gradeServiceMock.addGrade.and.returnValue(of(''));

    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule , MatInputModule , MatSelectModule , FormsModule , ToastrModule.forRoot()],
      declarations: [ AddGradeFormComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {}},
        { provide: MatDialogRef, useValue: {} },
        {provide: GradeService, useValue: gradeServiceMock}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGradeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('grade.StudentId should be equal to StudentID from local storage', () => {
    const studentID = '1';
    localStorage.setItem('studentID', studentID);
    fixture.detectChanges();
    expect(component.grade.studentID).toEqual(studentID);
  });

  // it('should call addedGradeDateTime method on addGrade method call', () => {
  //   spyOn(component, 'setGradeDateTime');
  //   component.addGrade();
  //   expect(component.setGradeDateTime).toHaveBeenCalledTimes(1);
  // });

  // it('should call showSuccessToastr method after addGrade method succeed', () => {
  //   spyOn(component, 'showSuccessToastr');
  //   component.addGrade();
  //   expect(component.showSuccessToastr).toHaveBeenCalledTimes(1);
  // });

  // it('grade.DateTime should be equal to currentDateTime', () => {
  //   const date = new Date().setMinutes(0, 0, 0);
  //   spyOn(component, 'grade');
  //   component.addGradeDateTime();
  //   expect(component.grade.dateTime.setMinutes(0, 0, 0)).toEqual(date);
  // });

  it('should contain 3 mat-form-fields', () => {
    const form = fixture.debugElement.queryAll(By.css('mat-form-field'));
    expect(form.length).toEqual(3);
  });


});
