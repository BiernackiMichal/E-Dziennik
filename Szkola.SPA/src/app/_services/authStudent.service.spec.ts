/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthStudentService } from './authStudent.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: AuthStudent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthStudentService],
      imports: [HttpClientModule]
    });
  });

  it('should ...', inject([AuthStudentService], (service: AuthStudentService) => {
    expect(service).toBeTruthy();
  }));
});
