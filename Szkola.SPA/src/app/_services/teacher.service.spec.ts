/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TeacherService } from './teacher.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: Teacher', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [TeacherService]
    });
  });

  it('should ...', inject([TeacherService], (service: TeacherService) => {
    expect(service).toBeTruthy();
  }));
});
