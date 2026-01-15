import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { EditableTable } from '../../../shared/components/editble-table/editable-table';
import {
  PaginationEvent,
  TableColumn,
} from '../../../shared/types/editable-table.types';
import { UpdateUserDto, UserDto } from '@task-manager/shared';
import { UsersStore } from 'apps/frontend/src/app/stores/users.store';
import { UserTableRow } from './users-table.types';

@Component({
  selector: 'app-users-table',
  imports: [EditableTable],
  templateUrl: './users-table.html',
  styleUrl: './users-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTable {
  private usersStore = inject(UsersStore);
  users = input<UserDto[]>([]);

  protected total = this.usersStore.total;
  protected currentPage = this.usersStore.currentPage;
  protected pageSize = 10;

  columns = computed((): TableColumn[] => [
    { field: 'username', header: 'Username', type: 'text' },
    { field: 'email', header: 'Email', type: 'text' },
    { field: 'firstName', header: 'First Name', type: 'text' },
    { field: 'lastName', header: 'Last Name', type: 'text' },
    { field: 'createdAt', header: 'Created At', type: 'text', editable: false },
    { field: 'updatedAt', header: 'Updated At', type: 'text', editable: false },
  ]);

  tableData = computed(() => {
    const users = this.users();

    return users.map((user): UserTableRow => {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      };
    });
  });

  onPaginationChange(event: PaginationEvent): void {
    const page = event.pageIndex + 1;
    const limit = event.pageSize;
    this.usersStore.loadUsers(page, limit);
  }

  onRowSave(event: { index: number; data: any }): void {
    const userData: UpdateUserDto = {
      username: event.data.username,
      email: event.data.email,
      firstName: event.data.firstName,
      lastName: event.data.lastName,
    };
    try {
      this.usersStore.updateUser(event.data.id, userData);
      alert('User updated successfully!');
    } catch (err) {
      console.error(err);
    }
  }

  onRowDelete(row: any): void {
    try {
      this.usersStore.deleteUser(row.id);
      alert('User deleted successfully!');
    } catch (err) {
      console.error(err);
    }
  }
}
