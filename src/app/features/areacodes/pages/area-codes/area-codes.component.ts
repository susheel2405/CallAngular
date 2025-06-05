import { Component, OnInit } from '@angular/core';
import { ActiveToggleRendererComponent } from '../../../../shared/component/active-toggle-renderer/active-toggle-renderer.component';
import { SoftDeleteButtonRendererComponent } from '../../../../shared/component/soft-delete-button-renderer/soft-delete-button-renderer.component';
import { AreaCodes } from '../../models/AreaCodes';
import { AreaCodesService } from '../../services/areacodes/area-codes.service';
import { ColDef, GetContextMenuItems, GetContextMenuItemsParams, ICellRendererParams } from 'ag-grid-community';
import { AddAreaCodeRowLocally, LoadAreaCodes, SoftDeleteAreaCode, UpdateAreaCode } from '../../state/area-code.actions';
import { Store } from '@ngxs/store';
import { AreaCodesState } from '../../state/area-code.state';

@Component({
  selector: 'app-area-codes',
  standalone: false,
  templateUrl: './area-codes.component.html',
  styleUrl: './area-codes.component.css',
})
export class AreaCodesComponent implements OnInit {

   ActiveToggleRendererComponent = ActiveToggleRendererComponent;
  SoftDeleteRendererComponent = SoftDeleteButtonRendererComponent;
  toggleOptions = false;
 
  rowData: AreaCodes[] = [];
 
  columnDefs: ColDef<AreaCodes>[] = [
    {
      field: 'AreaCode',
      headerName: 'Code',
      sortable: true,
      flex: 1,
      maxWidth: 150,
      editable: true,
      cellEditor: 'agTextCellEditor',
      valueFormatter: (params) =>
        params.value ? params.value : 'Enter Areacode',
      cellClassRules: {
        'hint-text': (params) => !params.value,
      },
      cellStyle: { borderRight: '1px solid #ccc', textAlign: 'center' },
      headerClass: 'bold-header',
    },
    {
      field: 'Description',
      headerName: 'Description',
      sortable: true,
      flex: 2,
      minWidth: 200,
      editable: true,
      cellEditor: 'agTextCellEditor',
      valueFormatter: (params) =>
        params.value ? params.value : 'Enter Country/Region',
      cellClassRules: {
        'hint-text': (params) => !params.value,
      },
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
    },
    {
      field: 'Type',
      headerName: 'Type',
      sortable: true,
      flex: 1,
      minWidth: 180,
      editable: true,
      // cellEditor: 'agSelectCellEditor',
      cellEditor: 'agRichSelectCellEditor',
      cellEditorParams: {
        values: ['Landline', 'Mobile', 'International'],
      },
      valueFormatter: (params) => (params.value ? params.value : 'Select Type'),
      cellClassRules: {
        'hint-text': (params) => !params.value,
      },
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
    },
 
    {
      field: 'IsActive',
      headerName: 'Active',
      flex: 1,
      minWidth: 120,
 
      cellRenderer: 'activeToggleRenderer',
 
      cellStyle: {
        borderRight: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      headerClass: 'bold-header',
    },
 
    {
      headerName: 'Delete',
      // field: 'isDeleted',
      flex: 1,
      minWidth: 100,
      cellRenderer: 'softDeleteRenderer',
      cellStyle: {
        borderRight: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      headerClass: 'bold-header',
      onCellClicked: (params: any) => this.softDeleteProvider(params.data),
    },
  ];
 
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };
 
  constructor(
    private store: Store,
    private areaCodesService: AreaCodesService
  ) {}
 
  ngOnInit(): void {
    this.store.dispatch(new LoadAreaCodes());
    this.store.select(AreaCodesState.getAreaCodes).subscribe((data) => {
      console.log('From select:', data);
      this.rowData = data;
    });
  }
 
  onCellValueChanged(event: any): void {
    const row = event.data;
 
    const isNew = !row.AreaCodeId;
 
    const isComplete =
      row.AreaCode &&
      row.Description &&
      row.Type !== undefined &&
      row.Type !== null &&
      row.IsActive !== null &&
      row.IsActive !== undefined;
 
    if (isNew && isComplete) {
      this.areaCodesService.addAreaCode(row).subscribe((savedRow) => {
        const updatedData = this.rowData.map((r) => (r === row ? savedRow : r));
        // Sort the new list with savedRow having valid AreaCodeId
        const sorted = [...updatedData].sort((a, b) => {
          const idA = a.AreaCodeId ?? 0;
          const idB = b.AreaCodeId ?? 0;
          return idB - idA;
        });
        this.rowData = sorted;
         alert('Area code added successfully!');
      },
   
   
    );
    } else if (!isNew) {
      this.store.dispatch(new UpdateAreaCode(row));
    }
  }
 
  getRowClass = (params: any) => {
    // If AreaCodeId is not present, it's a newly added temporary row
    return !params.data.AreaCodeId ? 'temporary-row' : '';
  };
 
  softDeleteProvider(areaCode: AreaCodes): void {
    const updatedAreaCode = { ...areaCode, isDeleted: true };
    this.store.dispatch(new SoftDeleteAreaCode(updatedAreaCode));
  }
 
  addRow(): void {
    const newRow: AreaCodes = {
      // AreaCodeId: 0,
      AreaCode: '',
      Description: '',
      Type: 'Landline',
      IsActive: true,
 
      // isDeleted: false,
    };
    this.store.dispatch(new AddAreaCodeRowLocally(newRow));
  }
 
  getContextMenuItems: GetContextMenuItems = (
    params: GetContextMenuItemsParams
  ) => {
    const addRow = {
      name: 'Add Row',
      action: () => this.addRow(),
      icon: '<i class="fas fa-plus"></i>',
    };
 
    const deleteRow = {
      name: 'Delete Row',
      action: () => {
        if (params.node) {
          this.softDeleteProvider(params.node.data);
        }
      },
      icon: '<i class="fas fa-trash"></i>',
    };
 
    return [addRow, deleteRow, 'separator', 'copy', 'export'];
  };
 


}