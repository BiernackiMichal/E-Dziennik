/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DeleteSubjectFormComponent } from './DeleteSubjectForm.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';
import { SubjectService } from 'src/app/_services/Subject.service';

describe('DeleteSubjectFormComponent', () => {
  let component: DeleteSubjectFormComponent;
  let fixture: ComponentFixture<DeleteSubjectFormComponent>;
  let subjectServiceMock: any;

  beforeEach(async(() => {
    subjectServiceMock = jasmine.createSpyObj('SubjectService', ['deleteSubject']);
    subjectServiceMock.deleteSubject.and.returnValue(of(''));
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      declarations: [ DeleteSubjectFormComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {}},
        { provide: MatDialogRef, useValue: {} },
        {provide: SubjectService, useValue: subjectServiceMock}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSubjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
