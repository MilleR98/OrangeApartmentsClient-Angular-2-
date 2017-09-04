import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { User } from '../models/user';
import {Observable} from "rxjs/Observable";


@Injectable()
export class UserService {
  constructor(private http: Http, private config: AppConfig) { }

  getAll() {
    return this.http.get(this.config.apiUrl + '/user/', this.Token());
  }

  getById(_id: number) {
    return this.http.get(this.config.apiUrl + '/user/' + _id, this.Token());
  }

  getCurrentUser() {
    return this.http.get(this.config.apiUrl + '/api/account/user-info' , this.Token()).map((res: Response) => {
      return <any>res.json();
    });
  }

  changePassword(model) {
    return this.http.post(this.config.apiUrl + '/api/account/register',
      {'oldpassword': model.oldpassword, 'newpassword': model.newpassword, 'confirmpassword': model.confirmpassword },
      this.Token()).map((response: Response) => response.json());
  }

  changeEmail(model) {
    return this.http.post(this.config.apiUrl + '/api/account/register',
      {'currentpassword': model.currentpassword, 'newemail': model.newemail},
      this.Token()).map((response: Response) => response.json());
  }

  register(user: User) {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.config.apiUrl + '/api/account/register', user, options).
    map((response: Response) => response.json());
  }

  update(user: User) {
    return this.http.put(this.config.apiUrl + '/user/' + user.id, user, this.Token()).
    map((response: Response) => response.json());
  }

  delete(_id: number) {
    return this.http.delete(this.config.apiUrl + '/user/' + _id, this.Token()).
    map((response: Response) => response.json());
  }

  private Token() {
    const currentUser = localStorage.getItem('currentUserToken');
    if (currentUser) {
      const headers = new Headers({ 'Token': currentUser});
      return new RequestOptions({ headers: headers });
    }
  }
}
