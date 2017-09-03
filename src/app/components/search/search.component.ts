import {Component, OnInit} from '@angular/core';
import {SearchApartmentService} from '../../services/search-apartment.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'

})

export class SearchComponent implements OnInit {

  constructor(public _apartmentService: SearchApartmentService) {}
  ngOnInit() {}

  more() {
    this._apartmentService.searchApartments().subscribe();
    this._apartmentService.page++;
  }

  search() {
    this._apartmentService.lastPage = 0;
    this._apartmentService.page = 0;
    this._apartmentService.apartmentList = [];
    this._apartmentService.searchApartments().subscribe();
    this._apartmentService.page++;
  }
}
