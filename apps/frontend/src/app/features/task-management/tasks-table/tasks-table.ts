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
import { TaskDto, TaskStatus, UpdateTaskDto } from '@task-manager/shared';
import {
  Category,
  User,
  TaskTableRow,
} from 'apps/frontend/src/app/features/task-management/tasks-table/tasks-table.types';
import { TasksStore } from 'apps/frontend/src/app/stores/tasks.store';

@Component({
  selector: 'app-tasks-table',
  imports: [EditableTable],
  templateUrl: './tasks-table.html',
  styleUrl: './tasks-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksTable {
  private tasksStore = inject(TasksStore);
  tasks = input<TaskDto[]>([]);
  categories = input<Category[]>([]);
  users = input<User[]>([]);

  // Pagination state from store
  protected total = this.tasksStore.total;
  protected currentPage = this.tasksStore.currentPage;
  protected pageSize = 10;

  taskStatuses = [
    { label: 'To Do', value: TaskStatus.TODO },
    { label: 'In Progress', value: TaskStatus.IN_PROGRESS },
    { label: 'Done', value: TaskStatus.DONE },
  ];

  columns = computed((): TableColumn[] => [
    { field: 'task', header: 'Task', type: 'text' },
    { field: 'description', header: 'Description', type: 'textarea' },
    {
      field: 'status',
      header: 'Status',
      type: 'select',
      options: this.taskStatuses,
    },
    {
      field: 'category',
      header: 'Category',
      type: 'select',
      options: this.categories().map((c) => ({ label: c.name, value: c.id })),
    },
    { field: 'dueDate', header: 'Due Date', type: 'date' },
    {
      field: 'assigned',
      header: 'Assigned',
      type: 'select',
      options: this.users().map((u) => ({
        label: `${u.firstName} ${u.lastName}`,
        value: u.id,
      })),
    },
  ]);

  tableData = computed(() => {
    const tasks = this.tasks();

    return tasks.map((task): TaskTableRow => {
      return {
        id: task.id,
        task: task.title,
        description: task.description || '-',
        status: task.status,
        category: task.categoryId,
        dueDate: new Date(task.dueDate),
        assigned: task.assignedTo,
      };
    });
  });

  onPaginationChange(event: PaginationEvent): void {
    const page = event.pageIndex + 1;
    const limit = event.pageSize;
    this.tasksStore.loadTasks(page, limit);
  }

  onRowSave(event: { index: number; data: any }): void {
    const taskData: UpdateTaskDto = {
      categoryId: event.data.category,
      assignedTo: event.data.assigned,
      title: event.data.task,
      description: event.data.description,
      status: event.data.status,
      dueDate: event.data.dueDate,
    };
    try {
      this.tasksStore.updateTask(event.data.id, taskData);
      alert('Task updated successfully!');
    } catch (err) {
      console.error(err);
    }
  }

  onRowDelete(row: any): void {
    try {
      this.tasksStore.deleteTask(row.id);
      alert('Task deleted successfully!');
    } catch (err) {
      console.error(err);
    }
  }
}
