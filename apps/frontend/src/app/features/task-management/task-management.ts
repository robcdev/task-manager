import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CustomCard } from '../../shared/components/custom-card/custom-card';
import { EntityQuickCreator } from '../../shared/components/entity-quick-creator/entity-quick-creator';

@Component({
  selector: 'app-task-management',
  imports: [CustomCard, EntityQuickCreator],
  templateUrl: './task-management.html',
  styleUrl: './task-management.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskManagement {}
