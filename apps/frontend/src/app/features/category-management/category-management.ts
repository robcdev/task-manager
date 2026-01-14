import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CustomCard } from 'apps/frontend/src/app/shared/components/custom-card/custom-card';
import { EntityQuickCreator } from "../../shared/components/entity-quick-creator/entity-quick-creator";

@Component({
  selector: 'app-category-management',
  imports: [CustomCard, EntityQuickCreator],
  templateUrl: './category-management.html',
  styleUrl: './category-management.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryManagement {}
