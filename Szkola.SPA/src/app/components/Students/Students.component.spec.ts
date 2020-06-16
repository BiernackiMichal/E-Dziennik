/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { StudentsComponent } from './Students.component';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ClassesComponent } from '../Classes/Classes.component';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { AuthTeacherService } from 'src/app/_services/authTeacher.service';
import { StudentService } from 'src/app/_services/Student.service';

describe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;
  let studentServiceMock: any;
  let authTeacherServiceMock: any;

  beforeEach(async(() => {
    studentServiceMock = jasmine.createSpyObj('StudentService', ['getStudentsByClassId']);
    studentServiceMock.getStudentsByClassId.and.returnValue(of(''));

    authTeacherServiceMock = jasmine.createSpyObj('AuthTeacherService', ['logout']);
    authTeacherServiceMock.logout.and.returnValue(of(''));

    TestBed.configureTestingModule({
      imports: [MatTableModule , FormsModule , MatMenuModule , RouterTestingModule.withRoutes([
        {path: 'classes', component: ClassesComponent}
      ]) ],
      declarations: [ StudentsComponent ],
      providers: [
        {provide: StudentService, useValue: studentServiceMock},
        {provide: AuthTeacherService, useValue: authTeacherServiceMock},
        {provide: MatDialog, useValue: {}}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
