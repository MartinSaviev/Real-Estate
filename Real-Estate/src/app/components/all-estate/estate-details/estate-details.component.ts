import { Component, OnInit } from '@angular/core';
import { EstateDetailsService } from './estate-details.service';
import { ActivatedRoute } from '@angular/router';
import { House } from '../../types/typeHouse';
import { AuthenticationService } from '../../auth/authentication.service';

@Component({
  selector: 'app-estate-details',
  standalone: true,
  imports: [],
  templateUrl: './estate-details.component.html',
  styleUrl: './estate-details.component.css',
})
export class EstateDetailsComponent implements OnInit {
  email: string = '';
  authEmail: string | null = '';

  house: House = {
    imageUrl: '',
    price: '',
    address: '',
    furniture: '',
    bedrooms: 0,
    description: '',
    _id: undefined,
    owner: undefined,
  };

  constructor(
    private route: ActivatedRoute,
    private EstateDetailsService: EstateDetailsService,
    private AuthenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['estateId'];
    this.EstateDetailsService.getEstateDetails(id).subscribe((data) => {
      this.house = data as House;

      const id = this.route.snapshot.params['estateId'];
      this.EstateDetailsService.getEstateDetails(id).subscribe((data) => {
        this.house = data as House;
        this.email = this.house.owner?.email || '';
        this.authEmail = this.AuthenticationService.isAuthEmail;
      });
    });
  }
}
