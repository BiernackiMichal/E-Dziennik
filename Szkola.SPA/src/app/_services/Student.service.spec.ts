/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StudentService } from './Student.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: Student', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [StudentService]
    });
  });

  it('should ...', inject([StudentService], (service: StudentService) => {
    expect(service).toBeTruthy();
  }));
});
