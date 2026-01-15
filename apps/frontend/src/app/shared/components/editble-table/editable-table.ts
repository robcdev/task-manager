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

  /**
   * Emit pagination change events.
   *
   * @param {any} event - paginator event payload
   * @returns {void}
   */
  onPageChange(event: any): void {
    this.paginationChange.emit({
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
      previousPageIndex: event.previousPageIndex,
    });
  }

  /**
   * Resolve a display value for a table cell.
   *
   * @param {any} item - row data
   * @param {string} field - column field path
   * @param {TableColumn} [column] - column configuration
   * @returns {any} - formatted cell value
   */
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

  /**
   * Check if a given row is in edit mode.
   *
   * @param {number} rowIndex - row index
   * @returns {boolean} - true when editing
   */
  isEditing(rowIndex: number): boolean {
    return this.editingRowIndex() === rowIndex;
  }

  /**
   * Enable edit mode for a row.
   *
   * @param {number} rowIndex - row index
   * @param {any} row - row data
   * @returns {void}
   */
  onEdit(rowIndex: number, row: any): void {
    this.editingRowIndex.set(rowIndex);
    this.editingRowData.set({ ...row });
  }

  /**
   * Cancel the current edit session.
   *
   * @returns {void}
   */
  onCancel(): void {
    this.editingRowIndex.set(null);
    this.editingRowData.set(null);
  }

  /**
   * Save the current edit session.
   *
   * @param {number} rowIndex - row index
   * @returns {void}
   */
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

  /**
   * Emit a delete event for a row.
   *
   * @param {any} row - row data
   * @returns {void}
   */
  onDelete(row: any): void {
    // Placeholder for delete functionality
    this.rowDelete.emit(row);
  }

  /**
   * Update the editing model for a field.
   *
   * @param {string} field - column field path
   * @param {any} value - new value
   * @returns {void}
   */
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

  /**
   * Read the current editing value for a field.
   *
   * @param {string} field - column field path
   * @returns {any} - field value
   */
  getEditingValue(field: string): any {
    const data = this.editingRowData();
    if (!data) return null;

    return field.split('.').reduce((obj, key) => obj?.[key], data);
  }

  /**
   * Determine if a column is editable.
   *
   * @param {TableColumn} column - column configuration
   * @returns {boolean} - true when editable
   */
  isEditable(column: TableColumn): boolean {
    return column.editable !== false;
  }
}
