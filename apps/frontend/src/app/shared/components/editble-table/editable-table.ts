import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  viewChild,
  computed,
  signal,
} from '@angular/core';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import {
  PaginationEvent,
  TableColumn,
} from 'apps/frontend/src/app/shared/types/editable-table.types';

@Component({
  selector: 'app-editable-table',
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
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
  showActions = input<boolean>(false);

  paginationChange = output<PaginationEvent>();
  rowSave = output<any>();
  rowDelete = output<any>();

  paginator = viewChild<MatPaginator>(MatPaginator);

  displayedColumns = computed(() => this.columns().map((col) => col.field));

  editingRowIndex = signal<number | null>(null);
  editingRowData = signal<any>(null);

  onPageChange(event: any): void {
    this.paginationChange.emit({
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
      previousPageIndex: event.previousPageIndex,
    });
  }

  getColumnValue(item: any, field: string, column?: TableColumn): any {
    const value = field.split('.').reduce((obj, key) => obj?.[key], item);

    if (value instanceof Date) {
      return value.toLocaleDateString();
    }

    if (column?.type === 'select' && column.options) {
      const option = column.options.find((opt) => opt.value === value);
      return option?.label ?? value ?? '-';
    }

    return value ?? '-';
  }

  isEditing(rowIndex: number): boolean {
    return this.editingRowIndex() === rowIndex;
  }

  onEdit(rowIndex: number, row: any): void {
    this.editingRowIndex.set(rowIndex);
    this.editingRowData.set({ ...row });
  }

  onCancel(): void {
    this.editingRowIndex.set(null);
    this.editingRowData.set(null);
  }

  onSave(rowIndex: number): void {
    if (this.editingRowData()) {
      this.rowSave.emit({
        index: rowIndex,
        data: this.editingRowData(),
      });
    }
    this.editingRowIndex.set(null);
    this.editingRowData.set(null);
  }

  onDelete(row: any): void {
    // Placeholder for delete functionality
    this.rowDelete.emit(row);
  }

  onFieldChange(field: string, value: any): void {
    const currentData = this.editingRowData();
    if (currentData) {
      const updatedData = { ...currentData };
      const fields = field.split('.');
      let obj = updatedData;

      for (let i = 0; i < fields.length - 1; i++) {
        obj = obj[fields[i]];
      }

      obj[fields[fields.length - 1]] = value;
      this.editingRowData.set(updatedData);
    }
  }

  getEditingValue(field: string): any {
    const data = this.editingRowData();
    if (!data) return null;

    return field.split('.').reduce((obj, key) => obj?.[key], data);
  }

  isEditable(column: TableColumn): boolean {
    return column.editable !== false;
  }
}
