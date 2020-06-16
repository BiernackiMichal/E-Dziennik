/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthTeacherService } from './authTeacher.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: AuthTeacher', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AuthTeacherService]
    });
  });

  it('should ...', inject([AuthTeacherService], (service: AuthTeacherService) => {
    expect(service).toBeTruthy();
  }));
});
