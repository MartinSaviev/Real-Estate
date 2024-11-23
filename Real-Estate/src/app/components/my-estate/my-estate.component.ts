import { Component, OnInit } from '@angular/core';
import { Email, House } from '../types/typeHouse';
import { RouterLink } from '@angular/router';
import { MyEstateService } from './my-estate.service';

@Component({
  selector: 'app-my-estate',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-estate.component.html',
  styleUrl: './my-estate.component.css',
})
export class MyEstateComponent implements OnInit {
  houses: House[] = [];
  email: Email | undefined = undefined;

  constructor(private MyEstateService: MyEstateService) {}

  ngOnInit(): void {
    this.MyEstateService.getMyEstate().subscribe((data) => {
      this.houses = Object.values(data);
      const sessionEmail: string = localStorage.getItem('email') ?? '';
      if (sessionEmail) {
        const result = this.houses.filter(
          (house) => house.owner?.email === sessionEmail
        );
        this.houses = result;
      }
    });
  }
}
