import { Component } from '@angular/core';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LastThreeEstateComponent } from './components/last-three-estate/last-three-estate.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomePageComponent,NavbarComponent,LastThreeEstateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Real-Estate';
}
