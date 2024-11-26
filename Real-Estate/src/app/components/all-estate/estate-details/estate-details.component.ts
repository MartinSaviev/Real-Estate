import { Component, OnInit } from '@angular/core';
import { EstateDetailsService } from './estate-details.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { House } from '../../types/typeHouse';
import { DeleteService } from '../../delete/delete.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-estate-details',
  standalone: true,
  imports: [RouterLink],
  providers: [DeleteService, EstateDetailsService],
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
    private AuthService: AuthService,
    private DeleteService: DeleteService,
    private navigation: Router,
    
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['estateId'];
    this.EstateDetailsService.getEstateDetails(id).subscribe((data) => {
      this.house = data as House;

      const id = this.route.snapshot.params['estateId'];
      this.EstateDetailsService.getEstateDetails(id).subscribe((data) => {
        this.house = data as House;
        this.email = this.house.owner?.email || '';
        this.authEmail = this.AuthService.email || '';
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
    const id = this.route.snapshot.params['estateId'];
    this.DeleteService.deleteEstate(id).subscribe(() => {
      this.navigation.navigate(['/my-estate']);
    });
  }

  onEdit() {
    const id = this.route.snapshot.params['estateId'];
    this.navigation.navigate([`/edit/${id}`]);
  }
}
