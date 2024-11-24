import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable()
export class EstateDetailsService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getEstateDetails(id: string) {
    return this.http.get(`${this.apiUrl}/realEstate/${id}`);
  }

  getOwner(id: string) {
    return this.http.get(`${this.apiUrl}/realEstate/${id}/owner`);
  }
}
