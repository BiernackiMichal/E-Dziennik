/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AddStudentFormComponent } from './AddStudentForm.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthStudentService } from '../../_services/authStudent.service';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AdminPanelComponent } from '../AdminPanel/AdminPanel.component';

describe('AddStudentFormComponent', () => {
  let component: AddStudentFormComponent;
  let fixture: ComponentFixture<AddStudentFormComponent>;
  let authStudentServiceMock: any;
  let router: any;


  beforeEach(async(() => {
    authStudentServiceMock = jasmine.createSpyObj('AuthStudentService', ['register']);
    authStudentServiceMock.register.and.returnValue(of(''));

    TestBed.configureTestingModule({
      declarations: [ AddStudentFormComponent ],
      imports: [BrowserAnimationsModule , MatInputModule , MatFormFieldModule , FormsModule, RouterTestingModule.withRoutes([
        {path: 'admin-panel', component: AdminPanelComponent}
      ]), ToastrModule.forRoot(), BrowserAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: AuthStudentService, useValue: authStudentServiceMock},
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentFormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.ngZone.run(() => {
      router.initialNavigation();
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('mat-card-title should be equal to Formularz dodawania ucznia', () => {
    const title = fixture.debugElement.query(By.css('mat-card-title')).nativeElement;
    expect(title.innerText).toEqual('Formularz dodawania ucznia');
  });

  it('should contain 8 mat-form-fields', () => {
    const form = fixture.debugElement.queryAll(By.css('mat-form-field'));
    expect(form.length).toEqual(8);
  });

  it('button innerText should be equal to Dodaj Klasę', () => {
    const element = fixture.debugElement.query(By.css('.dodaj-button'));
    expect(element.nativeElement.textContent.trim()).toContain('Dodaj ucznia');
  });

  it('button innerText should be equal to Anuluj', () => {
    const element = fixture.debugElement.query(By.css('.anuluj-button'));
    expect(element.nativeElement.textContent.trim()).toContain('Anuluj');
  });

  it('should return data from inputs on form submit',  () => {

    const student = {
      firstName: 'firstName',
      lastName: 'lastName' ,
      birthDate: 'birthDate',
      schoolClass: 'schoolClass',
      address: 'address',
      phone: 1,
      userName: 'userName',
      password: 'password'
    };
    const element = fixture.debugElement.queryAll(By.css('input'));
    expect(element.length).toEqual(8);
    const nativeButton1: HTMLInputElement = element[0].nativeElement;
    nativeButton1.value = 'firstName';
    const nativeButton2: HTMLInputElement = element[1].nativeElement;
    nativeButton2.value = 'lastName';
    const nativeButton3: HTMLInputElement = element[2].nativeElement;
    nativeButton3.value = 'schoolClass';
    const nativeButton4: HTMLInputElement = element[3].nativeElement;
    nativeButton4.value = 'birthDate';
    const nativeButton5: HTMLInputElement = element[4].nativeElement;
    nativeButton5.value = 'address';
    const nativeButton6: HTMLInputElement = element[5].nativeElement;
    nativeButton6.value = '1';
    const nativeButton7: HTMLInputElement = element[6].nativeElement;
    nativeButton7.value = 'userName';
    const nativeButton8: HTMLInputElement = element[7].nativeElement;
    nativeButton8.value = 'password';

    fixture.whenStable().then( () => {
      const button = fixture.debugElement.query(By.css('.dodaj-button')).nativeElement;
      button.click();
      fixture.whenStable().then( () => {
      expect(component.student).toEqual(student);
      });
    });
  });


});
