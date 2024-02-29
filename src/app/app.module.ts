import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxTimepicker12Module } from 'projects/ngx-timepicker12/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxTimepicker12Module,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
