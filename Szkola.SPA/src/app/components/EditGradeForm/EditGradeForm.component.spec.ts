/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EditGradeFormComponent } from './EditGradeForm.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GradeService } from 'src/app/_services/Grade.service';

describe('EditGradeFormComponent', () => {
  let component: EditGradeFormComponent;
  let fixture: ComponentFixture<EditGradeFormComponent>;
  let gradeServiceMock: any;

  beforeEach(async(() => {
    gradeServiceMock = jasmine.createSpyObj('gradeService', ['editGrade']);
    gradeServiceMock.editGrade.and.returnValue(of(''));

    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule , MatInputModule , MatSelectModule , ToastrModule.forRoot(), FormsModule],
      declarations: [ EditGradeFormComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {}},
        { provide: MatDialogRef, useValue: {} },
        {provide: GradeService, useValue: gradeServiceMock}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
