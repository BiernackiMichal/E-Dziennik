/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditClassFormComponent } from './editClassForm.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClassService } from 'src/app/_services/Class.service';

describe('EditClassFormComponent', () => {
  let component: EditClassFormComponent;
  let fixture: ComponentFixture<EditClassFormComponent>;
  let classServiceMock: any;

  beforeEach(async(() => {

    classServiceMock = jasmine.createSpyObj('ClassService', ['deleteClass']);
    classServiceMock.deleteClass.and.returnValue(of(''));
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule , MatInputModule , MatFormFieldModule , FormsModule , ToastrModule.forRoot()],
      declarations: [ EditClassFormComponent ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: ClassService, useValue: classServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
