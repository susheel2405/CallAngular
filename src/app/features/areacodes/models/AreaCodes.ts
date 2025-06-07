export interface AreaCodes {
  isEdited?: boolean;
  AreaCodeId?: number;
  AreaCode: string;
  Description: string;
  Type: 'Landline' | 'Mobile' | 'International';
  IsActive: boolean;
  isDeleted?: boolean;
}
