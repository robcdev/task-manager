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

  /**
   * Create a new task.
   *
   * @param {CreateTaskDto} createTaskDto - task payload
   * @returns {Observable<ApiResponse<TaskDto>>} - response with created task
   */
  createTask(createTaskDto: CreateTaskDto): Observable<ApiResponse<TaskDto>> {
    return this.http.post<ApiResponse<TaskDto>>(this.baseUrl, createTaskDto);
  }

  /**
   * Fetch paginated tasks.
   *
   * @param {number} page - page number (1-based)
   * @param {number} limit - page size
   * @returns {Observable<PaginatedResponse<TaskDto>>} - paginated response with tasks
   */
  findAllTasks(page = 1, limit = 25): Observable<PaginatedResponse<TaskDto>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<PaginatedResponse<TaskDto>>(this.baseUrl, { params });
  }

  /**
   * Fetch a single task by id.
   *
   * @param {string} id - task id
   * @returns {Observable<ApiResponse<TaskDto>>} - response with task data
   */
  findTask(id: string): Observable<ApiResponse<TaskDto>> {
    return this.http.get<ApiResponse<TaskDto>>(`${this.baseUrl}/${id}`);
  }

  /**
   * Update a task by id.
   *
   * @param {string} id - task id
   * @param {UpdateTaskDto} updateTaskDto - update task data
   * @returns {Observable<ApiResponse<TaskDto>>} - response with task data
   */
  updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto
  ): Observable<ApiResponse<TaskDto>> {
    return this.http.patch<ApiResponse<TaskDto>>(
      `${this.baseUrl}/${id}`,
      updateTaskDto
    );
  }

  /**
   * Delete a task by id.
   *
   * @param {string} id - task id
   * @returns {Observable<ApiResponse<null>>} - response with deletion result
   */
  deleteTask(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/${id}`);
  }
}
