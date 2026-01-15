import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CustomCard } from '../../shared/components/custom-card/custom-card';
import { EntityQuickCreator } from '../../shared/components/entity-quick-creator/entity-quick-creator';
import { TasksStore } from 'apps/frontend/src/app/stores/tasks.store';
import { CategoriesStore } from 'apps/frontend/src/app/stores/categories.store';
import { UsersStore } from 'apps/frontend/src/app/stores/users.store';
import { TasksTable } from './tasks-table/tasks-table';

@Component({
  selector: 'app-task-management',
  imports: [CustomCard, EntityQuickCreator, TasksTable],
  templateUrl: './task-management.html',
  styleUrl: './task-management.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskManagement {
  private categoriesStore = inject(CategoriesStore);
  private usersStore = inject(UsersStore);
  private tasksStore = inject(TasksStore);

  protected categories = this.categoriesStore.categories;
  protected users = this.usersStore.users;
  protected tasks = this.tasksStore.tasks;
}
