import { Component } from '@angular/core';
import { LastThreeEstateComponent } from '../last-three-estate/last-three-estate.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [LastThreeEstateComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
