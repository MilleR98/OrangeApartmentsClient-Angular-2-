import {Component, OnInit} from '@angular/core';
import {Apartment} from '../models/apartment';
import {DataService} from '../data.service';

@Component({
  selector: 'apartment-list',
  providers: [DataService],
  template: `
  <div>
    <div *ngFor="let apartment of apartmentList">
      <apartment-card [apartment]="apartment"></apartment-card>
    </div>
  </div>`
})

export class ApartmentListComponent implements OnInit {
  apartmentList: Apartment[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
      this.dataService.getApartments().subscribe(data => this.apartmentList = data);
  }
}
