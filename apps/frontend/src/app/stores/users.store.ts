import { Injectable, signal, inject } from '@angular/core';
import { UserDto, CreateUserDto, UpdateUserDto } from '@task-manager/shared';
import { UserService } from '../shared/services/user.service';

@Injectable({ providedIn: 'root' })
export class UsersStore {
  private userService = inject(UserService);

  private _users = signal<UserDto[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);
  private _totalPages = signal<number>(0);
  private _currentPage = signal<number>(1);
  private _total = signal<number>(0);
  private _pageSize = signal<number>(10);

  readonly users = this._users.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly totalPages = this._totalPages.asReadonly();
  readonly currentPage = this._currentPage.asReadonly();
  readonly total = this._total.asReadonly();

  loadUsers(page = 1, limit = 10): void {
    this._loading.set(true);
    this._error.set(null);

    this.userService.findAllUsers(page, limit).subscribe({
      next: (response) => {
        this._users.set(response.data);
        this._totalPages.set(response.totalPages);
        this._currentPage.set(response.page);
        this._total.set(response.total);
        this._pageSize.set(limit);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to load users');
        this._loading.set(false);
      },
    });
  }

  createUser(createUserDto: CreateUserDto): void {
    this._loading.set(true);
    this._error.set(null);

    this.userService.createUser(createUserDto).subscribe({
      next: () => {
        this.loadUsers(1, this._pageSize());
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to create user');
        this._loading.set(false);
      },
    });
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): void {
    this._loading.set(true);
    this._error.set(null);

    this.userService.updateUser(id, updateUserDto).subscribe({
      next: () => {
        this.loadUsers(this._currentPage(), this._pageSize());
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to update user');
        this._loading.set(false);
      },
    });
  }

  deleteUser(id: string): void {
    this._loading.set(true);
    this._error.set(null);

    this.userService.deleteUser(id).subscribe({
      next: () => {
        const currentPage = this._currentPage();
        const pageSize = this._pageSize();
        const currentUsersCount = this._users().length;

        let newPage = currentPage;
        if (currentUsersCount === 1 && currentPage > 1) {
          newPage = currentPage - 1;
        }

        this.loadUsers(newPage, pageSize);
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to delete user');
        this._loading.set(false);
      },
    });
  }
}
