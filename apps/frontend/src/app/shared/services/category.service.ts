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

  createCategory(
    createCategoryDto: CreateCategoryDto
  ): Observable<ApiResponse<CategoryDto>> {
    return this.http.post<ApiResponse<CategoryDto>>(
      this.baseUrl,
      createCategoryDto
    );
  }

  findAllCategories(
    page = 1,
    limit = 25
  ): Observable<PaginatedResponse<CategoryDto>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<PaginatedResponse<CategoryDto>>(this.baseUrl, { params });
  }

  findCategory(id: string): Observable<ApiResponse<CategoryDto>> {
    return this.http.get<ApiResponse<CategoryDto>>(`${this.baseUrl}/${id}`);
  }

  updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto
  ): Observable<ApiResponse<CategoryDto>> {
    return this.http.patch<ApiResponse<CategoryDto>>(
      `${this.baseUrl}/${id}`,
      updateCategoryDto
    );
  }

  deleteCategory(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/${id}`);
  }
}
