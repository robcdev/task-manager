import { Route } from '@angular/router';
import { CategoryManagement } from 'apps/frontend/src/app/features/category-management/category-management';
import { Settings } from 'apps/frontend/src/app/features/settings/settings';
import { TaskManagement } from 'apps/frontend/src/app/features/task-management/task-management';
import { UserManagement } from 'apps/frontend/src/app/features/user-management/user-management';

export const appRoutes: Route[] = [
  {
    path: '',
    component: TaskManagement,
  },
  {
    path: 'settings',
    component: Settings,
  },
  {
    path: 'user-management',
    component: UserManagement,
  },
  {
    path: 'category-management',
    component: CategoryManagement,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
