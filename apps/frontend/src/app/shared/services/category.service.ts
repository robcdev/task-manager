import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
  ApiResponse,
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

  findAllCategories(): Observable<ApiResponse<CategoryDto[]>> {
    return this.http.get<ApiResponse<CategoryDto[]>>(this.baseUrl);
  }

  findCategory(id: number): Observable<ApiResponse<CategoryDto>> {
    return this.http.get<ApiResponse<CategoryDto>>(`${this.baseUrl}/${id}`);
  }

  updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryDto
  ): Observable<ApiResponse<CategoryDto>> {
    return this.http.patch<ApiResponse<CategoryDto>>(
      `${this.baseUrl}/${id}`,
      updateCategoryDto
    );
  }

  deleteCategory(id: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/${id}`);
  }
}
