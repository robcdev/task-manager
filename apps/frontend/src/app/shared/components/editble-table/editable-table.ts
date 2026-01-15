import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  viewChild,
  computed,
} from '@angular/core';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { PaginationEvent, TableColumn } from 'apps/frontend/src/app/shared/types/editable-table.types';

@Component({
  selector: 'app-editable-table',
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './editable-table.html',
  styleUrl: './editable-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableTable {
  data = input<any[]>([]);
  columns = input<TableColumn[]>([]);
  totalItems = input<number>(0);
  pageSize = input<number>(10);
  pageIndex = input<number>(0);
  pageSizeOptions = input<number[]>([5, 10, 25, 50]);

  paginationChange = output<PaginationEvent>();

  paginator = viewChild<MatPaginator>(MatPaginator);

  displayedColumns = computed(() => this.columns().map((col) => col.field));

  onPageChange(event: any): void {
    this.paginationChange.emit({
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
      previousPageIndex: event.previousPageIndex,
    });
  }

  getColumnValue(item: any, field: string): any {
    const value = field.split('.').reduce((obj, key) => obj?.[key], item);

    if (value instanceof Date) {
      return value.toLocaleDateString();
    }

    return value ?? '-';
  }
}
