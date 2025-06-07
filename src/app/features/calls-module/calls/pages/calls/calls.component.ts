import { Component, OnInit } from '@angular/core';
import { ActiveToggleRendererComponent } from '../../../../../shared/component/active-toggle-renderer/active-toggle-renderer.component';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { Call } from '../../models/Call';
import { CallsService } from '../../services/call-services/calls.service';
import { Router } from '@angular/router';
import { ICellRendererParams, CellClickedEvent } from 'ag-grid-community';

@Component({
  selector: 'app-calls',
  standalone: false,
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.css'] // Fixed styleUrl to styleUrls
})
export class CallsComponent implements OnInit {
   call: Call[] = [];
  gridApi!: GridApi;

  ActiveToggleRendererComponent = ActiveToggleRendererComponent;

  columnDefs: ColDef<Call>[] = [
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 230,
      flex: 1,
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header'
    },
    {
      field: 'callRef',
      headerName: 'Call Ref #',
      minWidth: 230,
      flex: 1,
      cellRenderer: (params: ICellRendererParams) => {
        return `<a style="color:#007bff;cursor:pointer;text-decoration:underline;">${params.value}</a>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        const call = event.data;
        const callRef = call.callRef;
        const callerFullName = `${call.callerFirstName} ${call.callerLastName}`;
        const clientName = call.client;

        this.router.navigate(['/calls/call-details', callRef], {
          queryParams: {
            callerName: callerFullName,
            client: clientName
          }
        });
      },
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header'
    },
    {
      field: 'caseNo',
      headerName: 'Case #',
      minWidth: 230,
      flex: 1,
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header'
    },
    {
      field: 'callDate',
      headerName: 'Call Date',
      minWidth: 230,
      flex: 2,
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header'
    },
    {
      field: 'callerName',
      headerName: 'Caller Name',
      minWidth: 230,
      flex: 1,
      cellStyle: { borderRight: '1px solid #ccc', textAlign: 'center' },
      headerClass: 'bold-header'
    },
    {
      field: 'deceasedName',
      headerName: 'Deceased Name',
      minWidth: 230,
      flex: 1,
      cellStyle: { borderRight: '1px solid #ccc', textAlign: 'center' },
      headerClass: 'bold-header'
    },
    {
      field: 'client',
      headerName: 'Client',
      minWidth: 230,
      flex: 1,
      cellStyle: { borderRight: '1px solid #ccc', textAlign: 'center' },
      headerClass: 'bold-header'
    },
    {
      field: 'type',
      headerName: 'Type',
      minWidth: 230,
      flex: 1,
      cellStyle: { borderRight: '1px solid #ccc', textAlign: 'center' },
      headerClass: 'bold-header'
    },
    {
      field: 'funeralDate',
      headerName: 'Funeral Date',
      minWidth: 230,
      flex: 1,
      cellStyle: { borderRight: '1px solid #ccc', textAlign: 'center' },
      headerClass: 'bold-header'
    }
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };

  constructor(private callService: CallsService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.callService.getUsers().subscribe((data) => {
      this.call = data;
      this.resizeGrid();
    });
  }

  resizeGrid(): void {
    if (this.gridApi) {
      setTimeout(() => this.gridApi.sizeColumnsToFit(), 100);
    }
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.resizeGrid();
  }

  onRowClicked(event: any): void {
    const callRef = event.data?.callRef;
    if (callRef) {
      this.router.navigate(['calls/details', callRef]);
    }
  }

  onFitColumns(): void {
    this.gridApi?.sizeColumnsToFit();
  }

  onGridSizeChanged(): void {
    this.onFitColumns();
  }
}

  
