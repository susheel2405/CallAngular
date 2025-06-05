import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallsComponent } from './calls/pages/calls/calls.component';
import { CallDetailsComponent } from './call-details/pages/call-details/call-details.component';

const routes: Routes = [
  {
    path: '',
    component: CallsComponent,
    title: 'Calls',
    data: { breadcrumb: 'Call Centre / Calls' },
  },
  {
    path: 'details/:id', // Route for CallDetailsComponent with call ID
    component: CallDetailsComponent,
    title: 'Call Details',
    data: { breadcrumb: ' Calls / Calls Details' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallsModuleRoutingModule {}