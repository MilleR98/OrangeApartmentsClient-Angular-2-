import {Injectable} from '@angular/core';
import {Apartment} from '../models/apartment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {}

  getApartments(): Observable<Apartment[]> {
    return this.http.get('http://localhost:52215/api/apartment');
  }

}



