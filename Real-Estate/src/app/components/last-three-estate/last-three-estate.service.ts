import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class LastThreeEstateService {
  apiUrl = environment.apiUrl;
  
  
  constructor(private http: HttpClient) {}
  
  getHouses() {

    return this.http.get(this.apiUrl + '/realEstate');
    
  }
}
