import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContextMenu } from 'apps/frontend/src/app/shared/components/context-menu/context-menu';
import { ContextMenuItem } from 'apps/frontend/src/app/shared/types/context-menu.types';
import { TaskCreationDialog } from '../dialogs/task-creation-dialog/task-creation-dialog';
import { CategoryCreationDialog } from '../dialogs/category-creation-dialog/category-creation-dialog';
import { UserCreationDialog } from '../dialogs/user-creation-dialog/user-creation-dialog';
import { CategoriesStore } from 'apps/frontend/src/app/stores/categories.store';
import { UsersStore } from 'apps/frontend/src/app/stores/users.store';
import { TasksStore } from 'apps/frontend/src/app/stores/tasks.store';

const dialogProperties = {
  width: '600px',
  minHeight: '600px',
};

@Component({
  selector: 'app-entity-quick-creator',
  imports: [ContextMenu],
  templateUrl: './entity-quick-creator.html',
  styleUrl: './entity-quick-creator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityQuickCreator {
  //TODO: Remove hardcoded strings
  readonly dialog = inject(MatDialog);

  private categoriesStore = inject(CategoriesStore);
  private usersStore = inject(UsersStore);
  private tasksStore = inject(TasksStore);

  protected entityMenuItems: ContextMenuItem[] = [
    {
      label: 'Create Task',
      icon: 'task',
      action: () => this.createTask(),
    },
    {
      label: 'Create Category',
      icon: 'folder',
      action: () => this.createCategory(),
      divider: true,
    },

    {
      label: 'Create User',
      icon: 'folder',
      action: () => this.createUser(),
      divider: true,
    },
  ];

  /**
   * Open the task creation dialog and persist on save.
   *
   * @returns {void}
   */
  private createTask(): void {
    const dialogRef = this.dialog.open(TaskCreationDialog, dialogProperties);

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.saved) {
        this.tasksStore.createTask(result.data);
        alert('Task created successfully!');
      } else {
        console.log('Task creation cancelled');
      }
    });
  }

  /**
   * Open the category creation dialog and persist on save.
   *
   * @returns {void}
   */
  private createCategory(): void {
    const dialogRef = this.dialog.open(
      CategoryCreationDialog,
      dialogProperties,
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.saved) {
        this.categoriesStore.createCategory(result.data);
        alert('Category created successfully!');
      } else {
        console.log('Category creation cancelled');
      }
    });
  }

  /**
   * Open the user creation dialog and persist on save.
   *
   * @returns {void}
   */
  private createUser(): void {
    const dialogRef = this.dialog.open(UserCreationDialog, dialogProperties);

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.saved) {
        this.usersStore.createUser(result.data);
        alert('User created successfully!');
      } else {
        console.log('User creation cancelled');
      }
    });
  }
}
