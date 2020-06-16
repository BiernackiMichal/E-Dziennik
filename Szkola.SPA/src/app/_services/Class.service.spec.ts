/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClassService } from './Class.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: Class', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ClassService]
    });
  });

  it('should ...', inject([ClassService], (service: ClassService) => {
    expect(service).toBeTruthy();
  }));
});
