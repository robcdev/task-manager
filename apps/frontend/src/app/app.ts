import { Component } from '@angular/core';
import { MainNavComponent } from './shared/components/main-nav/main-nav.component';

@Component({
  imports: [MainNavComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'frontend';
}
