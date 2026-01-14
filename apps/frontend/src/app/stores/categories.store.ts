import { Injectable, signal, inject } from '@angular/core';
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from '@task-manager/shared';
import { CategoryService } from '../shared/services/category.service';

@Injectable({ providedIn: 'root' })
export class CategoriesStore {
  private categoryService = inject(CategoryService);

  private _categories = signal<CategoryDto[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  readonly categories = this._categories.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  loadCategories(): void {
    this._loading.set(true);
    this._error.set(null);

    this.categoryService.findAllCategories().subscribe({
      next: (response) => {
        this._categories.set(response.data);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to load categories');
        this._loading.set(false);
      },
    });
  }

  createCategory(createCategoryDto: CreateCategoryDto): void {
    this._loading.set(true);
    this._error.set(null);

    this.categoryService.createCategory(createCategoryDto).subscribe({
      next: (response) => {
        this._categories.update((categories) => [response.data, ...categories]);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to create category');
        this._loading.set(false);
      },
    });
  }

  updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): void {
    this._loading.set(true);
    this._error.set(null);

    this.categoryService.updateCategory(id, updateCategoryDto).subscribe({
      next: (response) => {
        this._categories.update((categories) =>
          categories.map((category) =>
            category.id === response.data.id ? response.data : category
          )
        );
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to update category');
        this._loading.set(false);
      },
    });
  }

  deleteCategory(id: number): void {
    this._loading.set(true);
    this._error.set(null);

    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this._categories.update((categories) =>
          categories.filter((category) => category.id !== id.toString())
        );
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to delete category');
        this._loading.set(false);
      },
    });
  }
}
