import { Injectable, signal, inject } from '@angular/core';
import { UserDto, CreateUserDto, UpdateUserDto } from '@task-manager/shared';
import { UserService } from '../shared/services/user.service';

@Injectable({ providedIn: 'root' })
export class UsersStore {
  private userService = inject(UserService);

  private _users = signal<UserDto[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  readonly users = this._users.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  loadUsers(): void {
    this._loading.set(true);
    this._error.set(null);

    this.userService.findAllUsers().subscribe({
      next: (response) => {
        this._users.set(response.data);
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
      next: (response) => {
        this._users.update((users) => [response.data, ...users]);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to create user');
        this._loading.set(false);
      },
    });
  }

  updateUser(id: number, updateUserDto: UpdateUserDto): void {
    this._loading.set(true);
    this._error.set(null);

    this.userService.updateUser(id, updateUserDto).subscribe({
      next: (response) => {
        this._users.update((users) =>
          users.map((user) => (user.id === response.data.id ? response.data : user))
        );
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to update user');
        this._loading.set(false);
      },
    });
  }

  deleteUser(id: number): void {
    this._loading.set(true);
    this._error.set(null);

    this.userService.deleteUser(id).subscribe({
      next: () => {
        this._users.update((users) =>
          users.filter((user) => user.id !== id.toString())
        );
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to delete user');
        this._loading.set(false);
      },
    });
  }
}
