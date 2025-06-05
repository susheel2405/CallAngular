import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class CallDetailsComponent {
formData = {
    firstName: '',
    lastName: '',
    callbackCode: '',
    callbackNumber: '',
    hourCode: '',
    hourNumber: '',
    cellCode: '',
    cellNumber: '',
    language: '',
  };

  callbackOptions = ['+27', '+91', '+44'];
  languageOptions = ['English', 'Afrikaans', 'Zulu'];
  call: Call | null = null;
  callRef: string | null = null; // Changed from callId to callRef

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.callRef = this.route.snapshot.paramMap.get('callRef'); // Changed from id to callRef
    const navigation = window.history.state;
    if (navigation.call) {
      this.call = navigation.call as Call;
      console.log('Received call data:', this.call); // Debug: Log received call
      this.formData = {
        firstName: this.call.callerName?.split(' ')[0] || '',
        lastName: this.call.callerName?.split(' ')[1] || '',
        callbackCode: this.call.callbackCode || '',
        callbackNumber: this.call.callbackNumber || '',
        hourCode: this.call.hourCode || '',
        hourNumber: this.call.hourNumber || '',
        cellCode: this.call.cellCode || '',
        cellNumber: this.call.cellNumber || '',
        language: this.call.language || '',
      };
    } else {
      console.error('No call data provided for callRef:', this.callRef); // Debug: Log missing data
      this.router.navigate(['/calls']);
    }
  }
}