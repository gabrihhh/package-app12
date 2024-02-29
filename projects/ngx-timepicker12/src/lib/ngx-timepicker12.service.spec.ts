import { TestBed } from '@angular/core/testing';

import { NgxTimepicker12Service } from './ngx-timepicker12.service';

describe('NgxTimepicker12Service', () => {
  let service: NgxTimepicker12Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxTimepicker12Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
