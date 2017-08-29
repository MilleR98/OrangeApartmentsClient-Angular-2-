import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AppConfig } from '../app.config';

@Injectable()
export class AuthService {

  constructor(private http: Http, private config: AppConfig) { }

  login(email: string, password: string) {
    return this.http.post(this.config.apiUrl + '/account/login', { email: email, password: password })
      .map((response: Response) => {
        // login successful if there's a Token token in the response
        const userToken = response.toString();
        if (userToken) {
          // store user details and Token token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', userToken);
        }
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}

