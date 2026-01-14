import { Component } from '@angular/core';
import { CustomCard } from 'apps/frontend/src/app/shared/components/custom-card/custom-card';

@Component({
  selector: 'app-category-management',
  imports: [CustomCard],
  templateUrl: './category-management.html',
  styleUrl: './category-management.scss',
})
export class CategoryManagement {}
