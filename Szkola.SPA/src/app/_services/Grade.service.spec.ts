/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GradeService } from './Grade.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: Grade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [GradeService]
    });
  });

  it('should ...', inject([GradeService], (service: GradeService) => {
    expect(service).toBeTruthy();
  }));
});
