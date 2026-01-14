import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CustomCard } from "../../shared/components/custom-card/custom-card";

@Component({
  selector: 'app-settings',
  imports: [CustomCard],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settings {

}
