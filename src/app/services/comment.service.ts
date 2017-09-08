import {Injectable} from '@angular/core';
import {AppConfig} from '../app.config';
import {Http, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class CommentService {
  constructor(private http: Http, private config: AppConfig) {}


  writeComment(commentedUserId, commentatorId, comment) {

    return this.http.post(
      this.config.apiUrl + '/api/comment/' + commentedUserId + '/write-comment/' + commentatorId,
      {'Comment': comment}).map(response => {response.json(); console.log(response); });
  }

  getComments(commentedUserId): Observable<any> {
    return this.http.get(this.config.apiUrl + '/api/comment/' + commentedUserId).map(response => response.json());
  }
}
