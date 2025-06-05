import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveToggleRendererComponent } from '../../../../../shared/component/active-toggle-renderer/active-toggle-renderer.component';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { Call } from '../../models/Call';
import { CallsService } from '../../services/call-services/calls.service';

@Component({
  selector: 'app-calls',
  standalone: false,
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.css'] // Fixed styleUrl to styleUrls
})
export class CallsComponent implements OnInit {
 ActiveToggleRendererComponent = ActiveToggleRendererComponent;
  call: Call[] = [];
  gridApi!: GridApi;

  columnDefs: ColDef<Call>[] = [
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 230,
      flex: 1,
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
    },
    {
      field: 'callRef',
      headerName: 'Call Ref #',
      minWidth: 230,
      flex: 1,
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
    },
    {
      field: 'caseNo',
      headerName: 'Case #',
      minWidth: 230,
      flex: 1,
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
    },
    {
      field: 'callDate',
      headerName: 'Call Date',
      minWidth: 230,
      flex: 2,
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
    },
    {
      field: 'callerName',
      headerName: 'Caller Name',
      minWidth: 230,
      flex: 1,
      cellStyle: { borderRight: '1px solid #ccc', textAlign: 'center' },
      headerClass: 'bold-header',
    },
    {
      field: 'deceasedName',
      headerName: 'Deceased Name',
      minWidth: 230,
      flex: 1,
      cellStyle: { borderRight: '1px solid #ccc', textAlign: 'center' },
      headerClass: 'bold-header',
    },
    {
      field: 'client',
      headerName: 'Client',
      minWidth: 230,
      flex: 1,
      cellStyle: { borderRight: '1px solid #ccc', textAlign: 'center' },
      headerClass: 'bold-header',
    },
    {
      field: 'type',
      headerName: 'Type',
      minWidth: 230,
      flex: 1,
      cellStyle: { borderRight: '1px solid #ccc', textAlign: 'center' },
      headerClass: 'bold-header',
    },
    {
      field: 'funeralDate',
      headerName: 'Funeral Date',
      minWidth: 230,
      flex: 1,
      cellStyle: { borderRight: '1px solid #ccc', textAlign: 'center' },
      headerClass: 'bold-header',
    },
  ];

  defaultColDef: ColDef = { sortable: true, filter: true, resizable: true };

  constructor(private callService: CallsService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  resizeGrid(): void {
    if (this.gridApi) {
      setTimeout(() => this.gridApi.sizeColumnsToFit(), 100);
    }
  }

  loadUsers(): void {
    this.callService.getUsers().subscribe({
      next: (data) => {
        this.call = data;
        console.log('Loaded calls:', data); // Debug: Log API data
        this.resizeGrid();
      },
      error: (err) => {
        console.error('Error loading calls:', err); // Debug: Log errors
      }
    });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    console.log('Grid ready'); // Debug: Confirm grid initialization
    this.resizeGrid();
  }

  onRowClicked(event: any): void {
    console.log('Row clicked event triggered:', event); // Debug: Confirm event firing
    const selectedCall: Call = event.data;
    console.log('Selected call:', selectedCall); // Debug: Log selected call
    if (selectedCall && selectedCall.callRef) {
      console.log('Navigating to:', `/calls/details/${selectedCall.callRef}`); // Debug: Log navigation
      this.router.navigate([`/calls/details`, selectedCall.callRef], {
        state: { call: selectedCall }
      });
    } else {
      console.error('No callRef found for selected call:', selectedCall); // Debug: Log missing callRef
    }
  }

  // Debug: Test navigation with a button
  testNavigation(): void {
    const testCall: Call = {
      callRef: 'TEST123',
      status: 'Open',
      caseNo: '456',
      callDate: '2025-06-01',
      callerName: 'John Doe',
      deceasedName: 'Jane Doe',
      client: '1Life',
      type: 'Legal Assist',
      funeralDate: '2025-06-10',
      agent: 'Hanno Coetzee'
    };
    console.log('Test navigation with:', testCall);
    this.router.navigate([`/calls/details`, testCall.callRef], {
      state: { call: testCall }
    });
  }
}