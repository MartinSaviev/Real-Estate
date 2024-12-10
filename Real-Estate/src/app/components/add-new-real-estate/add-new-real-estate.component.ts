import { Component } from '@angular/core';
import { AddNewRealEstateService } from './add-new-real-estate.service';
import { Email, House } from './typeHouse';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-real-estate',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [AddNewRealEstateService],
  templateUrl: './add-new-real-estate.component.html',
  styleUrls: ['./add-new-real-estate.component.css'],
})
export class AddNewRealEstateComponent {
  newRealEstate: House | undefined;
  email: Email | undefined = undefined;

  constructor(
    private AddNewRealEstateService: AddNewRealEstateService,
    private router: Router
  ) {
    if (typeof localStorage !== 'undefined') {
      const sessionEmail = localStorage.getItem('email');
      this.email = sessionEmail ? { email: sessionEmail } : undefined;
    }
  }

  estateFrom = new FormGroup({
    imageUrl: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(http|https):\/\/.+$/),
    ]),
    price: new FormControl('', [
      Validators.required,
      Validators.required,
      Validators.pattern('^[1-9][0-9]*$'),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
    ]),
    furniture: new FormControl('', [
      Validators.required,
      Validators.maxLength(20)
    ]),
    bedrooms: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(200),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(20)
    ]),
  });
  

  addNewRealEstate() {
    if (this.estateFrom.invalid) {
      alert('Всички стойности трябва да са въведени валидно!');
      return;
    }

    this.newRealEstate = {
      ...this.estateFrom.value,
      owner: {
        email: this.email?.email,
      },
    } as House;

    this.AddNewRealEstateService.postRealEstate(this.newRealEstate).subscribe({
      next: (response) => {
        console.log('Real estate added successfully', response);
      },
      error: (error) => {
        console.error('Error adding real estate', error);
      },
      complete: () => {
        this.router.navigate(['/']);
      },
    });
  }
}
