import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Call } from '../../../calls/models/Call';
import { CallsService } from '../../../calls/services/call-services/calls.service';
import { ActiveToggleRendererComponent } from '../../../../../shared/component/active-toggle-renderer/active-toggle-renderer.component';
import { ColDef, GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-call-details',
  standalone: false,
  templateUrl: './call-details.component.html',
  styleUrl: './call-details.component.css'
})
export class CallDetailsComponent implements OnInit{
callRef!: string;
  callerName: string = '';
  clientName: string = '';
   activeTab: string = 'caller'; // default tab
cellNumber: any;
// These properties should be defined in CallDetailsComponent
consent: string = '';
firstName: string = '';
secondName: string = '';
callbackNumber: string = '';
callbackNumberInput: string = '';
hourNumber: string = '';
hourNumberInput: string = '';
cellNumberInput: string = '';
isPolicyHolder: string = '';
agent: string = '';
callOpenDate: string = '';
language: string = '';
refGiven: string = '';



  constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.route.paramMap.subscribe(params => {
    this.callRef = params.get('callRef') ?? '';
  });

  this.route.queryParamMap.subscribe(queryParams => {
    this.callerName = queryParams.get('callerName') ?? '';
    this.clientName = queryParams.get('client') ?? '';
  });

 
  
}

selectTab(tabName: string) {
    this.activeTab = tabName;
  }
}