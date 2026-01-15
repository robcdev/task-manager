import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { EditableTable } from '../../../shared/components/editble-table/editable-table';
import {
  PaginationEvent,
  TableColumn,
} from '../../../shared/types/editable-table.types';
import { TaskDto } from '@task-manager/shared';
import { Category, User, TaskTableRow } from 'apps/frontend/src/app/features/task-management/tasks-table/tasks-table.types';

@Component({
  selector: 'app-tasks-table',
  imports: [EditableTable],
  templateUrl: './tasks-table.html',
  styleUrl: './tasks-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksTable {
  tasks = input<TaskDto[]>([]);
  categories = input<Category[]>([]);
  users = input<User[]>([]);

  columns: TableColumn[] = [
    { field: 'task', header: 'Task' },
    { field: 'description', header: 'Description' },
    { field: 'status', header: 'Status' },
    { field: 'category', header: 'Category' },
    { field: 'dueDate', header: 'Due Date' },
    { field: 'assigned', header: 'Assigned' },
  ];

  tableData = computed(() => {
    const tasks = this.tasks();
    const categories = this.categories();
    const users = this.users();

    return tasks.map((task): TaskTableRow => {
      const category = categories.find((c) => c.id === task.categoryId);
      const assignedUser = users.find((u) => u.id === task.assignedTo);

      return {
        id: task.id,
        task: task.title,
        description: task.description || '-',
        status: task.status,
        category: category?.name || '-',
        dueDate: new Date(task.dueDate).toLocaleDateString(),
        assigned: assignedUser
          ? `${assignedUser.firstName} ${assignedUser.lastName}`
          : '-',
      };
    });
  });

  onPaginationChange(event: PaginationEvent): void {
    console.log('Pagination changed:', event);
    // TODO: Fetch new data from API based on pagination
  }
}
