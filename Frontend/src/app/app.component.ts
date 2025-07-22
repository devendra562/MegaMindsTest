import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SummaryComponent } from "./components/summary/summary.component";
import { DetailedComponent } from "./components/detailed/detailed.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SummaryComponent, DetailedComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';
  selectedTab: 'summary' | 'detail' = 'summary';
}
