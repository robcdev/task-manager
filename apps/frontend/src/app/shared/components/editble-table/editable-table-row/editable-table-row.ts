import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TableColumn } from '../../../types/editable-table.types';

@Component({
  selector: 'app-editable-table-row',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './editable-table-row.html',
  styleUrl: './editable-table-row.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableTableRow {
  row = input.required<any>();
  columns = input.required<TableColumn[]>();
  rowIndex = input.required<number>();
  isEditing = input<boolean>(false);
  editingData = input<any>(null);
  showActions = input<boolean>(false);

  edit = output<{ rowIndex: number; row: any }>();
  save = output<number>();
  cancel = output<void>();
  delete = output<any>();
  fieldChange = output<{ field: string; value: any }>();

  /**
   * Emit edit event for the current row.
   *
   * @returns {void}
   */
  onEdit(): void {
    this.edit.emit({ rowIndex: this.rowIndex(), row: this.row() });
  }

  /**
   * Emit save event for the current row.
   *
   * @returns {void}
   */
  onSave(): void {
    this.save.emit(this.rowIndex());
  }

  /**
   * Emit cancel event for the current row.
   *
   * @returns {void}
   */
  onCancel(): void {
    this.cancel.emit();
  }

  /**
   * Emit delete event for the current row.
   *
   * @returns {void}
   */
  onDelete(): void {
    this.delete.emit(this.row());
  }

  /**
   * Emit field change event for the current row.
   *
   * @param {string} field - column field path
   * @param {any} value - new value
   * @returns {void}
   */
  onFieldChange(field: string, value: any): void {
    this.fieldChange.emit({ field, value });
  }

  /**
   * Resolve a display value for a table cell.
   *
   * @param {any} item - row data
   * @param {string} field - column field path
   * @param {TableColumn} column - column configuration
   * @returns {any} - formatted cell value
   */
  getColumnValue(item: any, field: string, column: TableColumn): any {
    const value = field.split('.').reduce((obj, key) => obj?.[key], item);

    if (value instanceof Date) {
      return value.toLocaleDateString();
    }

    if (column.type === 'select' && column.options) {
      const option = column.options.find((opt) => opt.value === value);
      return option?.label ?? value ?? '-';
    }

    return value ?? '-';
  }

  /**
   * Read the current editing value for a field.
   *
   * @param {string} field - column field path
   * @returns {any} - field value
   */
  getEditingValue(field: string): any {
    const data = this.editingData();
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
