import { Component } from '@angular/core';
import { LastThreeEstateService } from './last-three-estate.service';
import { House } from '../types/typeHouse';


@Component({
  selector: 'app-last-three-estate',
  standalone: true,
  imports: [],
  providers:[LastThreeEstateService],
  templateUrl: './last-three-estate.component.html',
  styleUrl: './last-three-estate.component.css'
 
})
export class LastThreeEstateComponent {
  houses: House[] = [];
  
  constructor(private LastThreeEstate:LastThreeEstateService){

    this.LastThreeEstate.getHouses().subscribe((data)=> {
     
      this.houses = Object.values(data).slice(-3);
    })

  }
}
