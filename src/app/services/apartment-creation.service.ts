import {AppConfig} from '../app.config';
import {Apartment} from '../models/apartment';
import {UserService} from './user.service';
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApartmentCreationService {

  constructor(private http: Http, private config: AppConfig, private userService: UserService) {}

  createApartment(apartment: Apartment) {

    if (localStorage.getItem('currentUserToken') != null) {

      return this.http.post(this.config.apiUrl + '/api/apartment', apartment,
        {headers: new Headers({ 'Token': localStorage.getItem('currentUserToken')})})
        .map((response: Response) => {
          return response;
        }).catch(error => Observable.throw(error));

    }
  }
}
