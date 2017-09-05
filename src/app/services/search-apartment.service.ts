import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {AppConfig} from '../app.config';
import {User} from '../models/user';
import {Apartment} from '../models/apartment';
import {forEach} from '@angular/router/src/utils/collection';
import {ApartmentTag} from '../models/apartment-tag';
import {isUndefined} from 'util';

/*
 * Responsible for page : Search Apartments
 *
 * All search data is stored in service fields.
 * components responsible for updating fields of service.
 */
@Injectable()
export class SearchApartmentService {
  private apiUrl = this.config.apiUrl + '/api/apartment';
  private tagListUrl = this.config.apiUrl + '/api/tag/getlist';
  city: string;
  district: string;
  street: string;
  sortBy: string;
  page: number;
  isLastPage: boolean;
  apartmentList: Apartment[] = [];
  tagList: ApartmentTag[] = [];
  apartmentImageIndex: Map<number, number>;
  apartmentImageCount: Map<number, number>;

  constructor(private http: Http, private config: AppConfig) {
    this.city = '';
    this.district = '';
    this.street = '';
    this.sortBy = 'price';
    this.page = 0;
    this.isLastPage = true;
    this.apartmentImageIndex = new Map();
    this.apartmentImageCount = new Map();
    this.getTagList().subscribe();
  }

  /*
   * Retrieves image count for particular apartment from server
   *
   * Needed to make available image scrolling on apartment card.
   */
  getApartmentImageCount(apartmentId: number): Observable<number> {
    const url = this.apiUrl + '/' + apartmentId.toString() + '/imageCount';

    return this.http.get(url)
      .map((resp: Response) => {
        if (resp.status === 200) {
          this.apartmentImageCount.set(apartmentId, resp.json());
          return resp.json();
        }
        return 0;
      });
  }

  /*
   * Sends request to web api to gain search data
   * 
   * Responsible for: creating URL and storing search data.
   * 
   */
  searchApartments(): Observable<void> {
    if (this.isLastPage) {
      return;
    }

    let apiQuery: string;
    apiQuery = '';

    let queryTags: string = this.getSelectedTagsUrl();
    if (queryTags.length > 0) {
      apiQuery += '?tags=' + queryTags;
    }

    if (apiQuery.length > 0) {
      apiQuery += '&sortBy=' + this.sortBy;
    } else {
      apiQuery += '?sortBy=' + this.sortBy;
    }

    this.city === '' || this.city == null ? '' : apiQuery += '&city=' + this.city;
    this.district === '' || this.district == null ? '' : apiQuery += '&district=' + this.district;
    this.street === '' || this.street == null ? '' : apiQuery += '&street=' + this.street;
    this.page > 0 ? apiQuery += '&page=' + this.page.toString() : '';

    console.log('API:' + this.apiUrl + apiQuery);

    return this.http.get(this.apiUrl + apiQuery)
      .map((resp: Response) => {
        if (resp.status === 200) {
          const aparts = resp.json();
          aparts.length === 0 ? this.isLastPage = true : this.isLastPage = false;

          if (this.page > 0) {
            for (let ap in aparts) {
              this.apartmentList.push(aparts[ap]);
            }
          } else {
            for (let ap in aparts) {
              this.apartmentList.push(aparts[ap]);
            }
          }
        }
      });
  }

  /*
   * Gets all tags available in db
   *
   * Tags are stored in service.
   */
  getTagList(): Observable<void> {
    return this.http.get(this.tagListUrl)
      .map((resp: Response) => {
        if (resp.status === 200) {
          this.tagList = resp.json();
        }
      });
  }

  /*
   * Incapsulates selected tags into url
   *
   * All selected tag names will be added
   * to request url.
   */
  getSelectedTagsUrl(): string {
    let result: string = '';
    for (let item of this.tagList) {
      if (item.isSelected === true) {
        if (result === '') {
          result = item.tagname;
        } else {
          result += ';' + item.tagname;
        }
      }
    }
    return result;
  }
}
