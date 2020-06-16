/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubjectService } from './Subject.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: Subject', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SubjectService]
    });
  });

  it('should ...', inject([SubjectService], (service: SubjectService) => {
    expect(service).toBeTruthy();
  }));
});
