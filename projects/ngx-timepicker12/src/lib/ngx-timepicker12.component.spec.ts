import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTimepicker12Component } from './ngx-timepicker12.component';

describe('NgxTimepicker12Component', () => {
  let component: NgxTimepicker12Component;
  let fixture: ComponentFixture<NgxTimepicker12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxTimepicker12Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTimepicker12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
