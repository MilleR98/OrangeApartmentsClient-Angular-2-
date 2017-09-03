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

  login(model) {
    return this.http.post(this.config.apiUrl + '/api/account/login', { Email: model.email, Password: model.password },
      this.options)
      .map((response: Response) => {
        console.log(response.json());
        const userToken = response.json().toString();
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

