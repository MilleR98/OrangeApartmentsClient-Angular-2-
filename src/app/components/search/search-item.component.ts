import {Component, Input, OnInit} from '@angular/core';
import {Apartment} from "../../models/apartment";
import {SearchApartmentService} from "../../services/search-apartment.service";

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css']
})

export class SearchItemComponent implements OnInit  {
  @Input() apartment: Apartment;
  imageIndex: number = 0;
  maxImageIndex: number = 0;

  constructor(public _apartmentService: SearchApartmentService){}

  ngOnInit() {
    this.imageIndex = this._apartmentService.getImageIndex(this.apartment.ApartmentId);
    this.maxImageIndex = this._apartmentService.maxImageIndex.get(this.apartment.ApartmentId);
    console.log('image index'+ this.imageIndex + ' maximage:'+this.maxImageIndex);
    if (this.maxImageIndex == null)
      console.log('apart'+this.apartment.ApartmentId + ' undefinded');
  }
  next() {
    this.imageIndex++;
    this._apartmentService.imageIndex.set(this.apartment.ApartmentId, this.imageIndex);
    this._apartmentService.getImage(this.apartment.ApartmentId, this.imageIndex).subscribe();
  }
  previous() {
    if (this.imageIndex > 0) {
      this.imageIndex--;
      this._apartmentService.imageIndex.set(this.apartment.ApartmentId, this.imageIndex);
    }
  }
}
