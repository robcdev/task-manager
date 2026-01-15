import { Component, OnInit, inject } from '@angular/core';
import { MainNavComponent } from './shared/components/main-nav/main-nav.component';
import { CategoriesStore } from 'apps/frontend/src/app/stores/categories.store';
import { TasksStore } from 'apps/frontend/src/app/stores/tasks.store';
import { UsersStore } from 'apps/frontend/src/app/stores/users.store';

@Component({
  imports: [MainNavComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private categoriesStore = inject(CategoriesStore);
  private tasksStore = inject(TasksStore);
  private usersStore = inject(UsersStore);
  ngOnInit(): void {
    this.categoriesStore.loadCategories();
    this.tasksStore.loadTasks(1, 10);
    this.usersStore.loadUsers();
  }
}
