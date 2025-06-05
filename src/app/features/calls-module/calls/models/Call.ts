export interface Call {
  callRef: string;
  status: string;
  caseNo: string;
  callDate: string;
  callerName: string;
  deceasedName: string;
  client: string;
  type: string;
  funeralDate: string;
  callbackCode?: string;
  callbackNumber?: string;
  hourCode?: string;
  hourNumber?: string;
  cellCode?: string;
  cellNumber?: string;
  language?: string;
  agent?: string;
}