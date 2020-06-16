/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ClassesComponent } from './Classes.component';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminPanelComponent } from '../AdminPanel/AdminPanel.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ClassService } from 'src/app/_services/Class.service';
import { AuthTeacherService } from 'src/app/_services/authTeacher.service';

describe('Classes', () => {
  let component: ClassesComponent;
  let fixture: ComponentFixture<ClassesComponent>;
  let classServiceMock: any;
  let authTeacherServiceMock: any;
  beforeEach(async(() => {
    classServiceMock = jasmine.createSpyObj('ClassService', ['getClasses']);
    classServiceMock.getClasses.and.returnValue(of(''));

    authTeacherServiceMock = jasmine.createSpyObj('AuthTeacherService', ['logout']);
    authTeacherServiceMock.logout.and.returnValue(of(''));



    TestBed.configureTestingModule({
      imports: [MatTableModule , MatMenuModule , RouterTestingModule.withRoutes([
        {path: 'admin-panel' , component: AdminPanelComponent}
      ])],
      declarations: [ ClassesComponent ],
      providers: [
        {provide: ClassService, useValue: classServiceMock},
        {provide: AuthTeacherService, useValue: authTeacherServiceMock},
        {provide: MatDialog, useValue: {}}
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
    fixture = TestBed.createComponent(ClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
