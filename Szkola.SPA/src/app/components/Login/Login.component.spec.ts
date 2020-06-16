/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LoginComponent } from './Login.component';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ClassesComponent } from '../Classes/Classes.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { AuthStudentService } from 'src/app/_services/authStudent.service';
import { AuthTeacherService } from 'src/app/_services/authTeacher.service';
import { SubjectsComponent } from '../Subjects/Subjects.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authTeacherServiceMock: any;
  let authStudentserviceMock: any;

  beforeEach(async(() => {
    authTeacherServiceMock = jasmine.createSpyObj('AuthTeacherService', ['login']);
    authTeacherServiceMock.login.and.returnValue(of(''));

    authStudentserviceMock = jasmine.createSpyObj('AuthStudentService', ['login']);
    authStudentserviceMock.login.and.returnValue(of(''));

    TestBed.configureTestingModule({
      imports: [MatRadioModule , FormsModule , ToastrModule.forRoot() , RouterTestingModule.withRoutes([
        {path: 'classes', component: ClassesComponent },
        {path: 'subjects', component: SubjectsComponent}
      ])],
      declarations: [ LoginComponent ],
      providers: [
        {provide: AuthTeacherService, useValue: authTeacherServiceMock},
        {provide: AuthStudentService, useValue: authStudentserviceMock}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
