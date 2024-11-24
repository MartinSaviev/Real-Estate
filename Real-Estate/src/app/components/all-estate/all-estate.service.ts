import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable()
export class AllEstateService {
  apiUrl = environment.apiUrl;
 
  constructor(private http:HttpClient) { }

  getAllEstate(){
    return this.http.get(this.apiUrl + '/realEstate/');
  }
}
