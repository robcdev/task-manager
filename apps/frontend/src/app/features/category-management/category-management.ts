import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CustomCard } from 'apps/frontend/src/app/shared/components/custom-card/custom-card';
import { EntityQuickCreator } from '../../shared/components/entity-quick-creator/entity-quick-creator';
import { CategoriesStore } from 'apps/frontend/src/app/stores/categories.store';
import { UsersStore } from 'apps/frontend/src/app/stores/users.store';
import { CategoriesTable } from './categories-table/categories-table';

@Component({
  selector: 'app-category-management',
  imports: [CustomCard, EntityQuickCreator, CategoriesTable],
  templateUrl: './category-management.html',
  styleUrl: './category-management.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryManagement implements OnInit {
  private categoriesStore = inject(CategoriesStore);
  private usersStore = inject(UsersStore);

  protected categories = this.categoriesStore.categories;
  protected users = this.usersStore.users;

  ngOnInit(): void {
    this.categoriesStore.loadCategories();
    this.usersStore.loadUsers();
  }
}
