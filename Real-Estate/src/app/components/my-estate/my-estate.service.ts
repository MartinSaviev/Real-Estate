import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyEstateService {

  apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

   getMyEstate(){
    return this.http.get(this.apiUrl + '/realEstate/');
  }
}
