/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AdminPanelComponent } from './AdminPanel.component';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { AuthTeacherService } from 'src/app/_services/authTeacher.service';
import { SubjectService } from 'src/app/_services/Subject.service';
import { TeacherService } from 'src/app/_services/teacher.service';
import { ClassesComponent } from '../Classes/Classes.component';
import { LoginComponent } from '../Login/Login.component';

describe('AdminPanelComponent', () => {
  let component: AdminPanelComponent;
  let fixture: ComponentFixture<AdminPanelComponent>;
  let authTeacherServiceMock: any;
  let subjectServiceMock: any;
  let teacherServiceMock: any;

  beforeEach(async(() => {
    subjectServiceMock = jasmine.createSpyObj('SubjectService', ['getSubjects']);
    subjectServiceMock.getSubjects.and.returnValue(of(''));

    authTeacherServiceMock = jasmine.createSpyObj('AuthTeacherService', ['logout']);
    authTeacherServiceMock.logout.and.returnValue(of(''));

    teacherServiceMock = jasmine.createSpyObj('TeacherService', ['getTeachers']);
    teacherServiceMock.getTeachers.and.returnValue(of(''));

    TestBed.configureTestingModule({
      imports: [MatMenuModule , ToastrModule.forRoot() , RouterTestingModule.withRoutes([
        {path: 'classes', component: ClassesComponent},
        {path: '', component: LoginComponent}
      ])],
      declarations: [ AdminPanelComponent ],
      providers: [
        {provide: AuthTeacherService, useValue: authTeacherServiceMock},
        {provide: SubjectService, useValue: subjectServiceMock},
        {provide: TeacherService, useValue: teacherServiceMock},
        {provide: MatDialog, useValue: {}}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
