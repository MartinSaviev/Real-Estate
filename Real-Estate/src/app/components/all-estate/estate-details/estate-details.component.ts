import { Component, OnInit } from '@angular/core';
import { EstateDetailsService } from './estate-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { House } from '../../types/typeHouse';
import { AuthenticationService } from '../../auth/authentication.service';
import { DeleteService } from '../../delete/delete.service';

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
    private AuthenticationService: AuthenticationService,
    private DeleteService: DeleteService,
    private navigation: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['estateId'];
    this.EstateDetailsService.getEstateDetails(id).subscribe((data) => {
      this.house = data as House;

      const id = this.route.snapshot.params['estateId'];
      this.EstateDetailsService.getEstateDetails(id).subscribe((data) => {
        this.house = data as House;
        this.email = this.house.owner?.email || '';
        this.authEmail = this.AuthenticationService.isAuthEmail();
      });
    });
  }

  owner() {
    if (this.email === this.authEmail) {
      return true;
    }
    return false;
  }

  onDelete() {
    console.log('deleteEstate');
    const id = this.route.snapshot.params['estateId'];
    this.DeleteService.deleteEstate(id).subscribe(() => {
      this.navigation.navigate(['/my-estate']);
    });
  }
}
