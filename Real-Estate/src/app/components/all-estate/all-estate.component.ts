import { Component } from '@angular/core';
import { AllEstateService } from './all-estate.service';
import { House } from '../types/typeHouse';

@Component({
  selector: 'app-all-estate',
  standalone: true,
  imports: [],
  templateUrl: './all-estate.component.html',
  styleUrl: './all-estate.component.css'
})
export class AllEstateComponent {
  houses: House[]= [];

  constructor(public allEstateService: AllEstateService){

    this.allEstateService.getAllEstate().subscribe((data) => {
      this.houses = Object.values(data);
    });

  }
}
