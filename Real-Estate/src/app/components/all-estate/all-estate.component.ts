import { Component, OnInit } from '@angular/core';
import { AllEstateService } from './all-estate.service';
import { House } from '../types/typeHouse';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-all-estate',
  standalone: true,
  imports: [RouterLink,CurrencyPipe],
  providers:[AllEstateService],
  templateUrl: './all-estate.component.html',
  styleUrl: './all-estate.component.css',
})
export class AllEstateComponent implements OnInit {
  houses: House[] = [];

  constructor(public allEstateService: AllEstateService) {}

  ngOnInit(): void {
    this.allEstateService.getAllEstate().subscribe((data) => {
      this.houses = Object.values(data);
    });
  }
}
