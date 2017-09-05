import {Component, OnInit} from '@angular/core';
import {SearchApartmentService} from '../../services/search-apartment.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'

})

/*
 * Responsible for Search Apartment page
 */
export class SearchComponent {

  constructor(public _apartmentService: SearchApartmentService) {}

  /*
   * Show more results button
   */
  more() {
    this._apartmentService.searchApartments().subscribe();
    this._apartmentService.page++;
  }

  /*
   * Search button actions
   *
   * Responsible for paging of results and
   * hiding/showing more results button.
   * Deletes search results of previous request.
   */
  search() {
    this._apartmentService.isLastPage = false;
    this._apartmentService.page = 0;
    this._apartmentService.apartmentList = [];
    this._apartmentService.searchApartments().subscribe();
    this._apartmentService.page++;
  }
}
