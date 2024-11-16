import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LastThreeEstateService {
  
  
  constructor(private http: HttpClient) {}
  
  getHouses() {
    const url = environment;
    return this.http.get(url.apiUrl + '/realEstate');
    
  }
}
