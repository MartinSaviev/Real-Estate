import { Component } from '@angular/core';
import { AddNewRealEstateService } from './add-new-real-estate.service';
import { Email, House } from '../types/typeHouse';
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
  email: Email | undefined = undefined;

  constructor(
    private addNewRealEstateData: AddNewRealEstateService,
    private router: Router
  ) {
    const sessionEmail = localStorage.getItem('email');
    this.email = sessionEmail ? { email: sessionEmail } : undefined;
  }

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
      owner: this.email,
    };

    this.addNewRealEstateData.postRealEstate(this.newRealEstate).subscribe({
      next: (house) => {
        console.log('Successfully added new real estate:', house);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error adding real estate:', err);
      },
    });
  }
}
