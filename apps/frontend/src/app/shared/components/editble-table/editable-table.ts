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
import { CommonModule } from '@angular/common';
import {
  PaginationEvent,
  TableColumn,
} from 'apps/frontend/src/app/shared/types/editable-table.types';
import { EditableTableRow } from './editable-table-row/editable-table-row';

@Component({
  selector: 'app-editable-table',
  imports: [CommonModule, MatPaginatorModule, EditableTableRow],
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
}
