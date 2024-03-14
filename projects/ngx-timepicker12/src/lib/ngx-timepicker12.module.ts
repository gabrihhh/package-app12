import { NgModule } from '@angular/core';
import { NgxTimepicker12Component } from './ngx-timepicker12.component';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    NgxTimepicker12Component
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [
    NgxTimepicker12Component
  ]
})
export class NgxTimepicker12Module { }
