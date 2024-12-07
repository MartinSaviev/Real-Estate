import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable()
export class EditService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getComment(estateId: string, commentId: string) {
    return this.http.get(
      `${this.apiUrl}/realEstate/${estateId}/comments/${commentId}`
    );
  }

  postComment(estateId: string, commentId: string, body: {}) {
    return this.http.patch(
      `${this.apiUrl}/realEstate/${estateId}/comments/${commentId}`,
      body
    );
  }
}
