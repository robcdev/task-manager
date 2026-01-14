import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-custom-card',
  imports: [],
  templateUrl: './custom-card.html',
  styleUrl: './custom-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomCard {
  title = input<string>();
}
