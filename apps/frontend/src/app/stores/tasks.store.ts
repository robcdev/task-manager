import { Injectable, signal, inject } from '@angular/core';
import { TaskDto, CreateTaskDto, UpdateTaskDto } from '@task-manager/shared';
import { TaskService } from '../shared/services/task.service';

@Injectable({ providedIn: 'root' })
export class TasksStore {
  private taskService = inject(TaskService);

  private _tasks = signal<TaskDto[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);
  private _totalPages = signal<number>(0);
  private _currentPage = signal<number>(1);
  private _total = signal<number>(0);

  readonly tasks = this._tasks.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly totalPages = this._totalPages.asReadonly();
  readonly currentPage = this._currentPage.asReadonly();
  readonly total = this._total.asReadonly();

  loadTasks(page = 1, limit = 25): void {
    this._loading.set(true);
    this._error.set(null);

    this.taskService.findAllTasks(page, limit).subscribe({
      next: (response) => {
        this._tasks.set(response.data);
        this._totalPages.set(response.totalPages);
        this._currentPage.set(response.page);
        this._total.set(response.total);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to load tasks');
        this._loading.set(false);
      },
    });
  }

  createTask(createTaskDto: CreateTaskDto): void {
    this._loading.set(true);
    this._error.set(null);

    this.taskService.createTask(createTaskDto).subscribe({
      next: (response) => {
        this._tasks.update((tasks) => [response.data, ...tasks]);
        this._total.update((total) => total + 1);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to create task');
        this._loading.set(false);
      },
    });
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): void {
    this._loading.set(true);
    this._error.set(null);

    this.taskService.updateTask(id, updateTaskDto).subscribe({
      next: (response) => {
        this._tasks.update((tasks) =>
          tasks.map((task) => (task.id === response.data.id ? response.data : task))
        );
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to update task');
        this._loading.set(false);
      },
    });
  }

  deleteTask(id: string): void {
    this._loading.set(true);
    this._error.set(null);

    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this._tasks.update((tasks) => tasks.filter((task) => task.id !== id));
        this._total.update((total) => total - 1);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to delete task');
        this._loading.set(false);
      },
    });
  }
}
