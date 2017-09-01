import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { AppConfig } from '../app.config';

@Injectable()
export class AuthService {
  isLoggedin = false;
  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http, private config: AppConfig) {
    this.headers = new Headers({ 'Content-Type': 'application/json'});
    this.options = new RequestOptions({ headers: this.headers });
  }

  login(email: string, password: string) {
    const body = JSON.stringify({ 'Email': email, 'Password': password });
    //  console.log(body);
    return this.http.post(this.config.apiUrl + '/api/account/login', { Email: email, Password: password },
      this.options)
      .map((response: Response) => {
        const userToken = response.toString();
        if (userToken) {
          localStorage.setItem('currentUserToken', userToken);
        }
      });
  }

  logout() {
    localStorage.removeItem('currentUserToken');
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

