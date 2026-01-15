import { Injectable, signal, inject } from '@angular/core';
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from '@task-manager/shared';
import { CategoryService } from '../shared/services/category.service';

@Injectable({ providedIn: 'root' })
export class CategoriesStore {
  private categoryService = inject(CategoryService);

  private _categories = signal<CategoryDto[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);
  private _totalPages = signal<number>(0);
  private _currentPage = signal<number>(1);
  private _total = signal<number>(0);
  private _pageSize = signal<number>(10);

  readonly categories = this._categories.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly totalPages = this._totalPages.asReadonly();
  readonly currentPage = this._currentPage.asReadonly();
  readonly total = this._total.asReadonly();

  loadCategories(page = 1, limit = 10): void {
    this._loading.set(true);
    this._error.set(null);

    this.categoryService.findAllCategories(page, limit).subscribe({
      next: (response) => {
        this._categories.set(response.data);
        this._totalPages.set(response.totalPages);
        this._currentPage.set(response.page);
        this._total.set(response.total);
        this._pageSize.set(limit);
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
      next: () => {
        this.loadCategories(1, this._pageSize());
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to create category');
        this._loading.set(false);
      },
    });
  }

  updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): void {
    this._loading.set(true);
    this._error.set(null);

    this.categoryService.updateCategory(id, updateCategoryDto).subscribe({
      next: () => {
        this.loadCategories(this._currentPage(), this._pageSize());
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to update category');
        this._loading.set(false);
      },
    });
  }

  deleteCategory(id: string): void {
    this._loading.set(true);
    this._error.set(null);

    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        const currentPage = this._currentPage();
        const pageSize = this._pageSize();
        const currentCategoriesCount = this._categories().length;

        let newPage = currentPage;
        if (currentCategoriesCount === 1 && currentPage > 1) {
          newPage = currentPage - 1;
        }

        this.loadCategories(newPage, pageSize);
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to delete category');
        this._loading.set(false);
      },
    });
  }
}
