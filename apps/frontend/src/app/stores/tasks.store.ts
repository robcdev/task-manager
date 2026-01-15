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
  private _pageSize = signal<number>(10);

  readonly tasks = this._tasks.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly totalPages = this._totalPages.asReadonly();
  readonly currentPage = this._currentPage.asReadonly();
  readonly total = this._total.asReadonly();

  /**
   * Load tasks with pagination.
   *
   * @param {number} page - page number (1-based)
   * @param {number} limit - page size
   * @returns {void}
   */
  loadTasks(page = 1, limit = 10): void {
    this._loading.set(true);
    this._error.set(null);

    this.taskService.findAllTasks(page, limit).subscribe({
      next: (response) => {
        this._tasks.set(response.data);
        this._totalPages.set(response.totalPages);
        this._currentPage.set(response.page);
        this._total.set(response.total);
        this._pageSize.set(limit);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to load tasks');
        this._loading.set(false);
      },
    });
  }

  /**
   * Create a new task and refresh the first page.
   *
   * @param {CreateTaskDto} createTaskDto - task payload
   * @returns {void}
   */
  createTask(createTaskDto: CreateTaskDto): void {
    this._loading.set(true);
    this._error.set(null);

    this.taskService.createTask(createTaskDto).subscribe({
      next: () => {
        // Reload page 1 to show the newly created task
        this.loadTasks(1, this._pageSize());
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to create task');
        this._loading.set(false);
      },
    });
  }

  /**
   * Update a task and refresh the current page.
   *
   * @param {string} id - task id
   * @param {UpdateTaskDto} updateTaskDto - update task data
   * @returns {void}
   */
  updateTask(id: string, updateTaskDto: UpdateTaskDto): void {
    this._loading.set(true);
    this._error.set(null);

    this.taskService.updateTask(id, updateTaskDto).subscribe({
      next: () => {
        // Reload the current page to reflect the changes
        this.loadTasks(this._currentPage(), this._pageSize());
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to update task');
        this._loading.set(false);
      },
    });
  }

  /**
   * Delete a task and refresh pagination.
   *
   * @param {string} id - task id
   * @returns {void}
   */
  deleteTask(id: string): void {
    this._loading.set(true);
    this._error.set(null);

    this.taskService.deleteTask(id).subscribe({
      next: () => {
        const currentPage = this._currentPage();
        const pageSize = this._pageSize();
        const currentTasksCount = this._tasks().length;

        // If deleting the last item on a page (and not on page 1), go to previous page
        let newPage = currentPage;
        if (currentTasksCount === 1 && currentPage > 1) {
          newPage = currentPage - 1;
        }

        // Reload the appropriate page
        this.loadTasks(newPage, pageSize);
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to delete task');
        this._loading.set(false);
      },
    });
  }
}
