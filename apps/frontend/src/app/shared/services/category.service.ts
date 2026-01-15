import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
  ApiResponse,
  PaginatedResponse,
} from '@task-manager/shared';
import { config } from '../../config/config';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private http = inject(HttpClient);
  private baseUrl = `${config.apiUrl}/category`;

  /**
   * Create a new category.
   *
   * @param {CreateCategoryDto} createCategoryDto - category payload
   * @returns {Observable<ApiResponse<CategoryDto>>} - response with created category
   */
  createCategory(
    createCategoryDto: CreateCategoryDto
  ): Observable<ApiResponse<CategoryDto>> {
    return this.http.post<ApiResponse<CategoryDto>>(
      this.baseUrl,
      createCategoryDto
    );
  }

  /**
   * Fetch paginated categories.
   *
   * @param {number} page - page number (1-based)
   * @param {number} limit - page size
   * @returns {Observable<PaginatedResponse<CategoryDto>>} - paginated response with categories
   */
  findAllCategories(
    page = 1,
    limit = 25
  ): Observable<PaginatedResponse<CategoryDto>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<PaginatedResponse<CategoryDto>>(this.baseUrl, { params });
  }

  /**
   * Fetch a single category by id.
   *
   * @param {string} id - category id
   * @returns {Observable<ApiResponse<CategoryDto>>} - response with category data
   */
  findCategory(id: string): Observable<ApiResponse<CategoryDto>> {
    return this.http.get<ApiResponse<CategoryDto>>(`${this.baseUrl}/${id}`);
  }

  /**
   * Update a category by id.
   *
   * @param {string} id - category id
   * @param {UpdateCategoryDto} updateCategoryDto - update category data
   * @returns {Observable<ApiResponse<CategoryDto>>} - response with category data
   */
  updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto
  ): Observable<ApiResponse<CategoryDto>> {
    return this.http.patch<ApiResponse<CategoryDto>>(
      `${this.baseUrl}/${id}`,
      updateCategoryDto
    );
  }

  /**
   * Delete a category by id.
   *
   * @param {string} id - category id
   * @returns {Observable<ApiResponse<null>>} - response with deletion result
   */
  deleteCategory(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/${id}`);
  }
}
