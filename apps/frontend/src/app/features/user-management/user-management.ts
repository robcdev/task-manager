import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CustomCard } from '../../shared/components/custom-card/custom-card';
import { EntityQuickCreator } from '../../shared/components/entity-quick-creator/entity-quick-creator';
import { UsersStore } from 'apps/frontend/src/app/stores/users.store';
import { UsersTable } from './users-table/users-table';

@Component({
  selector: 'app-user-management',
  imports: [CustomCard, EntityQuickCreator, UsersTable],
  templateUrl: './user-management.html',
  styleUrl: './user-management.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserManagement {
  private usersStore = inject(UsersStore);

  protected users = this.usersStore.users;
}
