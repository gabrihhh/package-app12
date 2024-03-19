import { NgModule } from '@angular/core';
import { NgxTimepicker12Component } from './ngx-timepicker12.component';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [
    NgxTimepicker12Component,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
  ],
  exports: [
    NgxTimepicker12Component,
  ]
})
export class NgxTimepicker12Module { }
