export type FieldType = 'text' | 'textarea' | 'select' | 'date' | 'number';

export interface SelectOption {
  value: any;
  label: string;
}

export interface TableColumn {
  field: string;
  header: string;
  sortable?: boolean;
  type?: FieldType;
  options?: SelectOption[];
  editable?: boolean;
}

export interface PaginationEvent {
  pageIndex: number;
  pageSize: number;
  previousPageIndex?: number;
}
