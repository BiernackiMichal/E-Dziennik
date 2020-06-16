/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EditSubjectFormComponent } from './EditSubjectForm.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubjectService } from 'src/app/_services/Subject.service';

describe('EditSubjectFormComponent', () => {
  let component: EditSubjectFormComponent;
  let fixture: ComponentFixture<EditSubjectFormComponent>;
  let editSubjectFormMock: any;

  beforeEach(async(() => {
    editSubjectFormMock = jasmine.createSpyObj('SubjectService', ['editSubject']);
    editSubjectFormMock.editSubject.and.returnValue(of(''));

    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule , MatInputModule , MatFormFieldModule , FormsModule , ToastrModule.forRoot()],
      declarations: [ EditSubjectFormComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {}},
        { provide: MatDialogRef, useValue: {} },
        {provide: SubjectService, useValue: editSubjectFormMock}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
