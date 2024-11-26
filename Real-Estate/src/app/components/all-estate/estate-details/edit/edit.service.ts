import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';

@Injectable()
export class EditService {
apiUrl = environment.apiUrl
  constructor(private http:HttpClient) { }

  getEdit(id:string){
    return this.http.get(`${this.apiUrl}/realEstate/${id}`)
  }
}
