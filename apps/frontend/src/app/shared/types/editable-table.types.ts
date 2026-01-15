export interface TableColumn {
  field: string;
  header: string;
  sortable?: boolean;
}

export interface PaginationEvent {
  pageIndex: number;
  pageSize: number;
  previousPageIndex?: number;
}
