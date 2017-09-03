import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AppConfig } from '../app.config';
import { User } from '../models/user';
import {Apartment} from '../models/apartment';
import {forEach} from '@angular/router/src/utils/collection';
import {ApartmentTag} from "../models/apartment-tag";
import {isUndefined} from 'util';

@Injectable()
export class SearchApartmentService {
  private apiUrl = this.config.apiUrl + '/api/apartment';
  city: string;
  district: string;
  street: string;
  sortBy: string;
  page: number;
  lastPage: number;
  apartmentList: Apartment[] = [];
  tagList: ApartmentTag[] = [];
  imageIndex: Map<number, number>;
  maxImageIndex: Map<number, number>

  constructor(private http: Http, private config: AppConfig) {
    this.city = '';
    this.district = '';
    this.street = '';
    this.sortBy = 'price';
    this.page = 0;
    this.tagList = Tags;
    this.lastPage = 0;
    this.imageIndex = new Map();
    this.maxImageIndex = new Map();
  };

  getImageIndex(apartmentId: number): number {
    if (this.imageIndex.get(apartmentId) == null) {
      return 0;
    } else {
      return this.imageIndex.get(apartmentId);
    }
  }

  getMaxImageIndex(apartmentId: number){
    if (this.maxImageIndex.get(apartmentId) == null) {
      return null;
    } else {
      return this.maxImageIndex.get(apartmentId);
    }
  }

  getImage(apartmentId: number, imageId: number): Observable<Object> {
    return this.http.get(this.apiUrl + '/' + apartmentId + '/img/' + imageId)
                    .map((resp:Response) => {
                      console.log('Response status code:' + resp.status);
                      return resp.arrayBuffer();
                    }).catch((error: any) => {
                      this.maxImageIndex.set(apartmentId, imageId);
                      return Observable.throw(error);
                    });
  }

  searchApartments(): Observable<Apartment[]> {
    if (this.lastPage > 0)
      return;

    let apiQuery: string;
    apiQuery = '';

    apiQuery += '?sortBy=' + this.sortBy;
    this.city === '' || this.city == null ? '' : apiQuery += '&city=' + this.city;
    this.district === '' || this.district == null ? '' : apiQuery += '&district=' + this.district;
    this.street === '' || this.street == null ? '' : apiQuery += '&street=' + this.street;
    this.page > 0 ? apiQuery += '&page=' + this.page.toString() : '';

    console.log(this.apiUrl + apiQuery);
    return this.http.get(this.apiUrl + apiQuery)
                    .map((resp: Response) => {
                        console.log(resp.status);
                        const aparts = resp.json();
                        if (aparts.length === 0)
                          this.lastPage = this.page;
                        let ret: Apartment[] = [];
                        if (this.page > 0) {
                        for (let ap in aparts) {
                          console.log(ap + ' and ' + aparts[ap]);
                          this.apartmentList.push(aparts[ap]);
                        }} else {
                          for (let ap in aparts) {
                            console.log(ap + ' and ' + aparts[ap]);
                            this.apartmentList.push(aparts[ap]);
                          }
                        }
                        console.log('page ='+this.page + ' lastpage='+this.lastPage);
                        return ret;
                    });
  }


  handleError(error: any) {
    console.error('Eroor occured ', error);
    return Observable.throw(error.message || error);
  }
}

const Tags: ApartmentTag[] = [
  {
    tagname: 'With children',
    isSelected: false
  },
  {
    tagname: 'With pets',
    isSelected: false
  },
  {
    tagname: 'Free parking',
    isSelected: false
  },
  {
    tagname: 'Payed parking',
    isSelected: false
  },
  {
    tagname: 'Washer',
    isSelected: false
  },
  {
    tagname: 'TV',
    isSelected: false
  },
  {
    tagname: 'Iron',
    isSelected: false
  },
  {
    tagname: 'Conditioner',
    isSelected: false
  }
];
