/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SubjectsComponent } from './Subjects.component';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminPanelComponent } from '../AdminPanel/AdminPanel.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { AuthStudentService } from 'src/app/_services/authStudent.service';
import { SubjectService } from 'src/app/_services/Subject.service';
import { AuthTeacherService } from 'src/app/_services/authTeacher.service';

describe('SubjectsComponent', () => {
  let component: SubjectsComponent;
  let fixture: ComponentFixture<SubjectsComponent>;
  let authStudentServiceMock: any;
  let subjectServiceMock: any;
  let authTeacherServiceMock: any;

  beforeEach(async(() => {
    authStudentServiceMock = jasmine.createSpyObj('AuthStudentService', ['logout']);
    authStudentServiceMock.logout.and.returnValue(of(''));

    authTeacherServiceMock = jasmine.createSpyObj('AuthTeacherService', ['logout']);
    authTeacherServiceMock.logout.and.returnValue(of(''));

    subjectServiceMock = jasmine.createSpyObj('SubjectService', ['getSubjectsWithGradesByStudentID', 'getSubjects']);
    subjectServiceMock.getSubjects.and.returnValue(of(''));
    subjectServiceMock.getSubjectsWithGradesByStudentID.and.returnValue(of(''));
    TestBed.configureTestingModule({
      imports: [MatTableModule , MatMenuModule , RouterTestingModule.withRoutes([
        {path: 'admin-panel', component: AdminPanelComponent}
      ])],
      declarations: [ SubjectsComponent ],
      providers: [
        {provide: AuthStudentService, useValue: authStudentServiceMock},
        {provide: SubjectService, useValue: subjectServiceMock},
        {provide: MatDialog, useValue: {} },
        {provide: AuthTeacherService, useValue: authTeacherServiceMock}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9' +
     '.eyJTdWJqZWN0SUQiOiIxIiwiTGFzdE5hbWUiOiJtYWNpZWsiLCJGaXJzdE5hbWUiOiJtYWNpZWsiLCJVc2VyUm9s' +
     'ZSI6IkFkbWluIiwibmJmIjoxNTg3NTQ3Mjc0LCJleHAiOjE1ODc1ODMyNzQsImlhdCI6MTU4NzU0NzI3NH0' +
     '.ieKQsy0zsiZhfSJnyjnzslEHnnv33iHyQDpKDDUoZHlAkVJy2B7ZUbin-xZyEVUTF4n4xLm-fW-1r1y6Fi-YlQ';
    localStorage.setItem('token', token);
    fixture = TestBed.createComponent(SubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
