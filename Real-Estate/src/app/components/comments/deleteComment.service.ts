import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable()
export class DeleteCommentService {
  apiUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  deleteComment(estateId:string,commentId:string){
    return this.http.delete(`${this.apiUrl}/realEstate/${estateId}/comments/${commentId}`);
  }
}
