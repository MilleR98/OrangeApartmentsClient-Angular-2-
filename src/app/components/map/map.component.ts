import {Component, OnInit, Input} from '@angular/core';
import {Http} from '@angular/http';
import {Apartment} from '../../models/apartment';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['map.component.css']
})

export class MapComponent implements OnInit {
  lat: number;
  lng: number;
  data: any;
  query = '';
  googleUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  key = '&key=AIzaSyDFhd2I4LhTwtcctL6T8QCiR8eGurjqRek';
  url = '';
  @Input()
  apartment: Apartment;
  constructor(private http: Http) { }
  ngOnInit () {
    this.getQuery();
  }
  getQuery() {
    const cityLexems = this.apartment.City.split(' ');
    const streetLexems = this.apartment.Street.split(' ');
    if (cityLexems.length > 1) {
      for ( let i = 0; i < cityLexems.length; i++) {
        this.query += cityLexems[i];
        if (i !== cityLexems.length - 1) {
          this.query += '+';
        }
      }
      this.query += ',+';
    } else {
      this.query += this.apartment.City + ',+';
    }
    if (streetLexems.length > 1) {
      for ( let i = 0; i < streetLexems.length; i++) {
        this.query += streetLexems[i];
        if (i !== streetLexems.length - 1) {
          this.query += '+';
        }
      }
      this.query += ',';
    } else {
      this.query += this.apartment.Street + ',';
    }
    this.query += '+' + this.apartment.StreetNumber;
    this.url = this.googleUrl + this.query + this.key;
    console.log(this.url);
    this.http.get(this.url)
      .subscribe(data => {this.data = data.json();
        this.lat = this.data.results[0].geometry.location.lat;
        this.lng = this.data.results[0].geometry.location.lng;
      });
  }
}
