import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { User } from '../models/user';

@Injectable()
export class UserService {
  constructor(private http: Http, private config: AppConfig) { }

  getAll() {
    return this.http.get(this.config.apiUrl + '/user/', this.Token()).
    map((response: Response) => response.json());
  }

  getById(_id: number) {
    return this.http.get(this.config.apiUrl + '/user/' + _id, this.Token()).
    map((response: Response) => response.json());
  }

  create(user: User) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.config.apiUrl + '/api/account/register', JSON.stringify(user), options);
  }

  update(user: User) {
    return this.http.put(this.config.apiUrl + '/user/' + user.id, user, this.Token());
  }

  delete(_id: number) {
    return this.http.delete(this.config.apiUrl + '/user/' + _id, this.Token());
  }

  private Token() {
    // create authorization header with Token token
    const currentUser = localStorage.getItem('currentUserToken');
    if (currentUser) {
      const headers = new Headers({ 'Token': currentUser});
      return new RequestOptions({ headers: headers });
    }
  }
}
