import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CallsModuleRoutingModule } from './calls-module-routing.module';
import { CallsComponent } from './calls/pages/calls/calls.component';
import { CallDetailsComponent } from './call-details/pages/call-details/call-details.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CallsComponent, CallDetailsComponent],
  imports: [
    CommonModule,
    CallsModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    AgGridModule,
  ],
  exports: [CallsComponent, CallDetailsComponent],
})
export class CallsModuleModule {}