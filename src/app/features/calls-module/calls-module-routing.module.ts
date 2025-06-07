import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallsComponent } from './calls/pages/calls/calls.component';
import { CallDetailsComponent } from './call-details/pages/call-details/call-details.component';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: CallsComponent,
    title: 'Calls',
    data: { breadcrumb: 'Call Centre / Calls' },
  },
  {
    path: 'call-details/:callRef', // 👈 dynamic route with parameter
    component: CallDetailsComponent,
    title: 'Call Details',
    data: { breadcrumb: 'Call Centre / Calls / Call Details' },
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallsModuleRoutingModule {}