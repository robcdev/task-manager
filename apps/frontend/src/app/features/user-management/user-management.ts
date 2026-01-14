import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CustomCard } from "../../shared/components/custom-card/custom-card";
import { EntityQuickCreator } from "../../shared/components/entity-quick-creator/entity-quick-creator";

@Component({
  selector: 'app-user-management',
  imports: [CustomCard, EntityQuickCreator],
  templateUrl: './user-management.html',
  styleUrl: './user-management.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserManagement {

}
