import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { AppConfig } from '../app.config';


@Injectable()
export class AuthService {
  private isLoggedin = false;
  private headers: Headers;
  private options: RequestOptions;

  constructor(private http: Http, private config: AppConfig) {
    this.headers = new Headers({ 'Content-Type': 'application/json'});
    this.options = new RequestOptions({ headers: this.headers });
  }

  login(model) {
    return this.http.post(this.config.apiUrl + '/api/account/login', { Email: model.email, Password: model.password },
      this.options)
      .map((response: Response) => {
        const responseStrings = response.json().toString().split('&');
        if (responseStrings) {
          localStorage.setItem('currentUserToken', responseStrings[0]);
          localStorage.setItem('currentUserName', responseStrings[1]);
          localStorage.setItem('currentUserId', responseStrings[2]);
        }
      });
  }

  logout() {
    this.http.post(this.config.apiUrl + '/api/account/logout', '',
      {headers: new Headers({ 'Token': localStorage.getItem('currentUserToken')})});
    localStorage.removeItem('currentUserToken');
    localStorage.removeItem('currentUserName');
    localStorage.removeItem('currentUserId');
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUserToken') == null) {
      this.isLoggedin = false;
      return this.isLoggedin;
    } else {
      return true;
    }
  }
}

