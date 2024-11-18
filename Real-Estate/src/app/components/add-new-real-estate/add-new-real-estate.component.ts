import { Component } from '@angular/core';
import { AddNewRealEstateService } from './add-new-real-estate.service';
import { House } from '../types/typeHouse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-real-estate',
  standalone: true,
  imports: [],
  templateUrl: './add-new-real-estate.component.html',
  styleUrls: ['./add-new-real-estate.component.css'],
})
export class AddNewRealEstateComponent {
  newRealEstate: House | undefined;

  constructor(
    private addNewRealEstateData: AddNewRealEstateService,
    private router: Router
  ) {}

  addNewRealEstate(
    event: Event,
    imageUrl: HTMLInputElement,
    price: HTMLInputElement,
    address: HTMLInputElement,
    furniture: HTMLInputElement,
    bedrooms: HTMLInputElement,
    description: HTMLTextAreaElement
  ): void {
    event.preventDefault();
    this.newRealEstate = {
      imageUrl: imageUrl.value,
      price: price.value,
      address: address.value,
      furniture: furniture.value,
      bedrooms: Number(bedrooms.value),
      description: description.value,
    };

    this.addNewRealEstateData.postRealEstate(this.newRealEstate).subscribe({
      next: (data) => {
        console.log('Successfully added new real estate:', data);
        console.log(data);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error adding real estate:', err);
      },
    });
  }
}
