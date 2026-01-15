import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskDto } from '@task-manager/shared';
import { config } from '../../config/config';

@Injectable()
export class TaskManagementService {
  private http = inject(HttpClient);
  private baseUrl = `${config.apiUrl}/task`;

  /**
   * Fetch tasks from the API.
   *
   * @returns {Observable<TaskDto[]>} - response with tasks
   */
  getTasks() {
    return this.http.get<TaskDto[]>(this.baseUrl);
  }
}
