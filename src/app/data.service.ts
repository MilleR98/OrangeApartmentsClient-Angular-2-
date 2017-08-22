import {Injectable} from '@angular/core';
import {Apartment} from './models/apartment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {}

  getApartments(): Observable<Apartment[]> {
    return this.http.get('http://localhost:52215/api/apartment');
  }

}

var  Apartments : Apartment[] = [
    { id: 1, City: 'Lviv', Street: 'Vodna', StreetNumber: 5 },
    { id: 2, City: 'Lviv', Street: 'Masaryka', StreetNumber: 6 }
  ];

