/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DeleteTeacherFormComponent } from './DeleteTeacherForm.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';
import { TeacherService } from 'src/app/_services/teacher.service';

describe('DeleteTeacherFormComponent', () => {
  let component: DeleteTeacherFormComponent;
  let fixture: ComponentFixture<DeleteTeacherFormComponent>;
  let teacherServiceMock: any;

  beforeEach(async(() => {
    teacherServiceMock = jasmine.createSpyObj('TeacherService', ['deleteTeacher']);
    teacherServiceMock.deleteTeacher.and.returnValue(of(''));

    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {}},
        { provide: MatDialogRef, useValue: {} },
        {provide: TeacherService, useValue: teacherServiceMock}
      ],
      declarations: [ DeleteTeacherFormComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTeacherFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
