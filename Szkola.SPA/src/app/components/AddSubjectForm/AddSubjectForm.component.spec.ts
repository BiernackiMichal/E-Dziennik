/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AddSubjectFormComponent } from './AddSubjectForm.component';
import { of } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubjectService } from 'src/app/_services/Subject.service';
import { AdminPanelComponent } from '../AdminPanel/AdminPanel.component';

describe('AddSubjectFormComponent', () => {
  let component: AddSubjectFormComponent;
  let fixture: ComponentFixture<AddSubjectFormComponent>;
  let subjectServiceMock: any;
  let router: any;

  beforeEach(async(() => {
    subjectServiceMock = jasmine.createSpyObj('SubjectService', ['addSubject']);
    subjectServiceMock.addSubject.and.returnValue(of(''));

    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule , FormsModule , ToastrModule.forRoot(), RouterTestingModule.withRoutes([
        {path: 'admin-panel', component: AdminPanelComponent}
      ])],
      declarations: [ AddSubjectFormComponent ],
      providers: [
        {provide: SubjectService, useValue: subjectServiceMock}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubjectFormComponent);
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

  // it('should call navigateToAdminPanel method after addSubject method succeed', () => {
  //   spyOn(component, 'navigateToAdminPanel');
  //   component.addSubject();
  //   expect(component.navigateToAdminPanel).toHaveBeenCalled();
  // });

  // it('should call toastr succes after addSubject method succeed', fakeAsync( () => {
  //   spyOn(router, 'navigateByUrl');
  //   spyOn(component, 'showSuccessToastr');
  //   component.addSubject();
  //   tick(2000);
  //   expect(component.showSuccessToastr).toHaveBeenCalledTimes(1);
  // }));

  // it('NavigateToAdminPanel method should navigate to /admin-panel ', fakeAsync( () => {
  //   spyOn(router, 'navigateByUrl');
  //   component.navigateToAdminPanel();
  //   fixture.detectChanges();
  //   tick(2000);
  //   expect(router.navigateByUrl).
  //   toHaveBeenCalledWith(router.createUrlTree(['/admin-panel']),
  //   {skipLocationChange: false});
  // }));

  it('should contain 2 mat-form-fields', () => {
    const form = fixture.debugElement.queryAll(By.css('mat-form-field'));
    expect(form.length).toEqual(2);
  });

  it('should contain 2 buttons', () => {
    const button = fixture.debugElement.queryAll(By.css('button'));
    expect(button.length).toEqual(2);
  });

  it('button innerText should be equal to Dodaj Klasę', () => {
    const element = fixture.debugElement.query(By.css('.dodaj-button'));
    expect(element.nativeElement.textContent.trim()).toContain('Dodaj przedmiot');
  });

  it('button innerText should be equal to Anuluj', () => {
    const element = fixture.debugElement.query(By.css('.anuluj-button'));
    expect(element.nativeElement.textContent.trim()).toContain('Anuluj');
  });


});
