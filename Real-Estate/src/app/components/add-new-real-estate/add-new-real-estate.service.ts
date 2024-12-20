import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { House } from './typeHouse';
import { environment } from '../../../environments/environment';

@Injectable()
export class AddNewRealEstateService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  postRealEstate(house: House) {
    return this.http.post<House>(`${this.apiUrl}/realEstate`, house);
  }
}
