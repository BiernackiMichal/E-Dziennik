/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AddTeacherFormComponent } from './AddTeacherForm.component';
import { of } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthTeacherService } from 'src/app/_services/authTeacher.service';
import { AdminPanelComponent } from '../AdminPanel/AdminPanel.component';

describe('AddTeacherFormComponent', () => {
  let component: AddTeacherFormComponent;
  let fixture: ComponentFixture<AddTeacherFormComponent>;
  let authTeacherServiceMock: any;

  beforeEach(async(() => {

    authTeacherServiceMock = jasmine.createSpyObj('AuthTeacherService', ['register']);
    authTeacherServiceMock.register.and.returnValue(of(''));

    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatInputModule , MatFormFieldModule , FormsModule , ToastrModule.forRoot(),
                RouterTestingModule.withRoutes([
        {path: 'admin-panel', component: AdminPanelComponent }
      ])],
      declarations: [ AddTeacherFormComponent ],
      providers: [
        {provide: AuthTeacherService, useValue: authTeacherServiceMock}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeacherFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
