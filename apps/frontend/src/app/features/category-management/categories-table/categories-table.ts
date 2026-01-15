import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { EditableTable } from '../../../shared/components/editble-table/editable-table';
import {
  PaginationEvent,
  TableColumn,
} from '../../../shared/types/editable-table.types';
import { CategoryDto, UpdateCategoryDto } from '@task-manager/shared';
import { CategoryTableRow } from './categories-table.types';
import { CategoriesStore } from 'apps/frontend/src/app/stores/categories.store';

@Component({
  selector: 'app-categories-table',
  imports: [EditableTable],
  templateUrl: './categories-table.html',
  styleUrl: './categories-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesTable {
  private categoriesStore = inject(CategoriesStore);
  categories = input<CategoryDto[]>([]);
  users = input<any[]>([]);

  protected total = this.categoriesStore.total;
  protected currentPage = this.categoriesStore.currentPage;
  protected pageSize = 10;

  columns = computed((): TableColumn[] => [
    { field: 'name', header: 'Name', type: 'text' },
    { field: 'description', header: 'Description', type: 'textarea' },
    {
      field: 'createdBy',
      header: 'Created By',
      type: 'select',
      options: this.users().map((u) => ({
        label: `${u.firstName} ${u.lastName}`,
        value: u.id,
      })),
    },
    { field: 'createdAt', header: 'Created At', type: 'text', editable: false },
  ]);

  tableData = computed(() => {
    const categories = this.categories();

    return categories.map((category): CategoryTableRow => {
      return {
        id: category.id,
        name: category.name,
        description: category.description ?? '-',
        createdBy: category.createdBy,
        createdAt: new Date(category.createdAt),
      };
    });
  });

  onPaginationChange(event: PaginationEvent): void {
    const page = event.pageIndex + 1;
    const limit = event.pageSize;
    this.categoriesStore.loadCategories(page, limit);
  }

  onRowSave(event: { index: number; data: any }): void {
    const categoryData: UpdateCategoryDto = {
      name: event.data.name,
      description: event.data.description,
      createdBy: event.data.createdBy,
    };
    try {
      this.categoriesStore.updateCategory(event.data.id, categoryData);
      alert('Category updated successfully!');
    } catch (err) {
      console.error(err);
    }
  }

  onRowDelete(row: any): void {
    try {
      this.categoriesStore.deleteCategory(row.id);
      alert('Category deleted successfully!');
    } catch (err) {
      console.error(err);
    }
  }
}
