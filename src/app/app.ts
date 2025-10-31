import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; // Add RouterModule


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule], // Add RouterModule here
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio_website');
}