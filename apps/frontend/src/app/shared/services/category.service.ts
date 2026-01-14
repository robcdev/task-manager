import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@task-manager/shared';
import { config } from '../../config/config';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private http = inject(HttpClient);
  private baseUrl = `${config.apiUrl}/category`;

  createCategory(createCategoryDto: CreateCategoryDto): Observable<CategoryDto> {
    return this.http.post<CategoryDto>(this.baseUrl, createCategoryDto);
  }

  findAllCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(this.baseUrl);
  }

  findCategory(id: number): Observable<CategoryDto> {
    return this.http.get<CategoryDto>(`${this.baseUrl}/${id}`);
  }

  updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryDto
  ): Observable<CategoryDto> {
    return this.http.patch<CategoryDto>(
      `${this.baseUrl}/${id}`,
      updateCategoryDto
    );
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
