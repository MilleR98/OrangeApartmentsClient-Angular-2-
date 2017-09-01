import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'

})

export class SearchComponent implements OnInit{
  page: number;
  ngOnInit() {
    this.page = 0;
  }
}
