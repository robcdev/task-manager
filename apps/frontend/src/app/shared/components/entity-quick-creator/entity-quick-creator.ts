import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContextMenu } from 'apps/frontend/src/app/shared/components/context-menu/context-menu';
import { ContextMenuItem } from 'apps/frontend/src/app/shared/types/context-menu.types';
import { TaskCreationDialog } from '../dialogs/task-creation-dialog/task-creation-dialog';
import { CategoryCreationDialog } from '../dialogs/category-creation-dialog/category-creation-dialog';
import { UserCreationDialog } from '../dialogs/user-creation-dialog/user-creation-dialog';

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

  private createTask(): void {
    const dialogRef = this.dialog.open(TaskCreationDialog, dialogProperties);

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.saved) {
        console.log('Task was saved:', result);
        // Will handle actual save logic later
      } else {
        console.log('Task creation cancelled');
      }
    });
  }

  private createCategory(): void {
    const dialogRef = this.dialog.open(
      CategoryCreationDialog,
      dialogProperties,
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.saved) {
        console.log('Category was saved:', result);
        // Will handle actual save logic later
      } else {
        console.log('Category creation cancelled');
      }
    });
  }

  private createUser(): void {
    const dialogRef = this.dialog.open(UserCreationDialog, dialogProperties);

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.saved) {
        console.log('User was saved:', result);
        // Will handle actual save logic later
      } else {
        console.log('User creation cancelled');
      }
    });
  }
}
