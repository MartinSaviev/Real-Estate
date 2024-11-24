import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  apiUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  deleteEstate(id:string){
    return this.http.delete(`${this.apiUrl}/realEstate/${id}`);
  }
}
