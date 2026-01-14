import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContextMenu } from 'apps/frontend/src/app/shared/components/context-menu/context-menu';
import { ContextMenuItem } from 'apps/frontend/src/app/shared/types/context-menu.types';

@Component({
  selector: 'app-entity-quick-creator',
  imports: [ContextMenu],
  templateUrl: './entity-quick-creator.html',
  styleUrl: './entity-quick-creator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityQuickCreator {
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
    console.log('Task creation initiated.');
  }

  private createCategory(): void {
    console.log('Category creation initiated.');
  }

  private createUser(): void {
    console.log('User creation initiated.');
  }
}
