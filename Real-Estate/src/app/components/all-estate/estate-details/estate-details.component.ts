import { Component, OnInit } from '@angular/core';
import { EstateDetailsService } from './estate-details.service';
import { ActivatedRoute } from '@angular/router';
import { House } from '../../types/typeHouse';

@Component({
  selector: 'app-estate-details',
  standalone: true,
  imports: [],
  templateUrl: './estate-details.component.html',
  styleUrl: './estate-details.component.css',
})
export class EstateDetailsComponent implements OnInit {
  house: House = {
    imageUrl: '',
    price: '',
    address: '',
    furniture: '',
    bedrooms: 0,
    description: '',
    _id: undefined, // Optional property
  };

  constructor(
    private route: ActivatedRoute,
    private EstateDetailsService: EstateDetailsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['estateId'];
    this.EstateDetailsService.getEstateDetails(id).subscribe((data) => {
      
      this.house = data as House;
    });
    console.log(id);
  }
}
