/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EditTeacherFormComponent } from './EditTeacherForm.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { TeacherService } from 'src/app/_services/teacher.service';

describe('EditTeacherFormComponent', () => {
  let component: EditTeacherFormComponent;
  let fixture: ComponentFixture<EditTeacherFormComponent>;
  let teacherServiceMock: any;

  beforeEach(async(() => {
    teacherServiceMock = jasmine.createSpyObj('TeacherService', ['editTeacher']);
    teacherServiceMock.editTeacher.and.returnValue(of(''));

    TestBed.configureTestingModule({
      imports: [FormsModule , ToastrModule.forRoot()],
      declarations: [ EditTeacherFormComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {}},
        { provide: MatDialogRef, useValue: {} },
        {provide: TeacherService, useValue: teacherServiceMock}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeacherFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
