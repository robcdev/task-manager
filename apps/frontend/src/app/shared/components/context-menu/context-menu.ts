import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ContextMenuItem } from '../../types/context-menu.types';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-context-menu',
  imports: [MatIconModule, MatButtonModule, MatMenuModule, MatDivider],
  templateUrl: './context-menu.html',
  styleUrl: './context-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenu {
  menuItems = input.required<ContextMenuItem[]>();
  icon = input<string>('more_vert');

  onItemClick(item: ContextMenuItem): void {
    if (!item.disabled) {
      item.action();
    }
  }
}
