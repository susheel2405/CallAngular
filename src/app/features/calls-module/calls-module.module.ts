import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallsModuleRoutingModule } from './calls-module-routing.module';
import { CallsComponent } from './calls/pages/calls/calls.component';
import { CallDetailsComponent } from './call-details/pages/call-details/call-details.component';
import { AgGridModule } from 'ag-grid-angular';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [CallsComponent, CallDetailsComponent],
  imports: [
    // BrowserModule,
     CommonModule,
      FormsModule,
    CallsModuleRoutingModule,
    AgGridModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    FloatLabelModule,
    DatePickerModule,
    CalendarModule,
    // BrowserAnimationsModule

  ],
  exports: [CallsComponent, CallDetailsComponent],
})
export class CallsModuleModule {}