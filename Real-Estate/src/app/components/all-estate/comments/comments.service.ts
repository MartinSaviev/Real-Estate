import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Comment } from './typeHouse';

@Injectable()
export class CommentsService {
  apiUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getCommentsByPostId(postId: string) {
    return this.http.get(`${this.apiUrl}/realEstate/${postId}/comments`);
  }

  getOwner(id: string) {
    return this.http.get(`${this.apiUrl}/realEstate/${id}/owner`);
  }

  addComment(id: string, comment:Comment) {
    return this.http.post(`${this.apiUrl}/realEstate/${id}/comments`, comment);
  }
}
