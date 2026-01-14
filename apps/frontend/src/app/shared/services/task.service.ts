import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  TaskDto,
  CreateTaskDto,
  UpdateTaskDto,
  PaginatedResponse,
  ApiResponse,
} from '@task-manager/shared';
import { config } from '../../config/config';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private baseUrl = `${config.apiUrl}/task`;

  createTask(createTaskDto: CreateTaskDto): Observable<ApiResponse<TaskDto>> {
    return this.http.post<ApiResponse<TaskDto>>(this.baseUrl, createTaskDto);
  }

  findAllTasks(page = 1, limit = 25): Observable<PaginatedResponse<TaskDto>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<PaginatedResponse<TaskDto>>(this.baseUrl, { params });
  }

  findTask(id: string): Observable<ApiResponse<TaskDto>> {
    return this.http.get<ApiResponse<TaskDto>>(`${this.baseUrl}/${id}`);
  }

  updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto
  ): Observable<ApiResponse<TaskDto>> {
    return this.http.patch<ApiResponse<TaskDto>>(
      `${this.baseUrl}/${id}`,
      updateTaskDto
    );
  }

  deleteTask(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/${id}`);
  }
}
