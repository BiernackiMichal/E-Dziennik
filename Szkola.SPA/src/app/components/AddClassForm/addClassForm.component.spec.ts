/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AddClassFormComponent } from './addClassForm.component';
import { of } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { by } from 'protractor';
import { AdminPanelComponent } from '../AdminPanel/AdminPanel.component';
import { ClassService } from 'src/app/_services/Class.service';

class ToastrMock {
  success() {
    return '';
  }

}




describe('AddClassFormComponent', () => {
  let component: AddClassFormComponent;
  let fixture: ComponentFixture<AddClassFormComponent>;
  let classServiceMock: any;
  let router: any;

  beforeEach(async(() => {
    classServiceMock = jasmine.createSpyObj('ClassService', ['addClass']);
    classServiceMock.addClass.and.returnValue(of('j'));

    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule , FormsModule, RouterTestingModule.withRoutes([
        {path: 'admin-panel', component: AdminPanelComponent}
      ])],
      declarations: [ AddClassFormComponent ],
      providers: [
        {provide: ClassService, useValue: classServiceMock},
        {provide: ToastrService, useClass: ToastrMock}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClassFormComponent);
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

  it('should contain 3 mat-form-fields', () => {
    const form = fixture.debugElement.queryAll(By.css('mat-form-field'));
    expect(form.length).toEqual(3);
  });

  it('should contain 2 buttons', () => {
    const button = fixture.debugElement.queryAll(By.css('button'));
    expect(button.length).toEqual(2);
  });

  it('button innerText should be equal to Dodaj Klasę', () => {
    const element = fixture.debugElement.query(By.css('.dodaj-button'));
    expect(element.nativeElement.textContent.trim()).toContain('Dodaj klasę');
  });

  it('button innerText should be equal to Anuluj', () => {
    const element = fixture.debugElement.query(By.css('.anuluj-button'));
    expect(element.nativeElement.textContent.trim()).toContain('Anuluj');
  });

  // it('should return data from inputs on form submit',  () => {
  //   const schoolClass = {
  //     Name: 'name',
  //     Description: 'desc',
  //     Educator: 'educator'
  //   };
  //   const element = fixture.debugElement.queryAll(By.css('input'));
  //   const nativeButton1: HTMLInputElement = element[0].nativeElement;
  //   nativeButton1.value = 'name';
  //   const nativeButton2: HTMLInputElement = element[1].nativeElement;
  //   nativeButton2.value = 'desc';
  //   const nativeButton3: HTMLInputElement = element[2].nativeElement;
  //   nativeButton3.value = 'educator';

  //   fixture.whenStable().then( () => {
  //     const button = fixture.debugElement.query(By.css('.dodaj-button')).nativeElement;
  //     button.click();
  //     fixture.whenStable().then( () => {
  //     expect(component.schoolClass).toEqual(schoolClass);
  //     });
  //   });
  // });

});
