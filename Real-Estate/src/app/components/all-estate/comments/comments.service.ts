import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable()
export class CommentsService {
  apiUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getCommentsByPostId(postId: string) {
    return this.http.get(`${this.apiUrl}/realEstate/${postId}/comments`);
  }
}
