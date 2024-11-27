import { Component, OnInit } from '@angular/core';
import { Email, House } from './typeHouse';
import { RouterLink } from '@angular/router';
import { MyEstateService } from './my-estate.service';
import { AuthService } from '../auth/auth.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-my-estate',
  standalone: true,
  imports: [RouterLink,CurrencyPipe],
  providers:[MyEstateService],
  templateUrl: './my-estate.component.html',
  styleUrl: './my-estate.component.css',
})
export class MyEstateComponent implements OnInit {
  houses: House[] = [];
  email: Email | undefined = undefined;

  constructor(private MyEstateService: MyEstateService, private AuthService:AuthService) {}

  ngOnInit(): void {
    this.MyEstateService.getMyEstate().subscribe((data) => {
      this.houses = Object.values(data);
      const sessionEmail = this.AuthService.email;
      if (sessionEmail) {
        const result = this.houses.filter(
          (house) => house.owner?.email === sessionEmail
        );
        this.houses = result;
      }
    });
  }
}
