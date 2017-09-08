import {Component, Input, OnInit} from '@angular/core';
import {Apartment} from '../../models/apartment';
import {SearchApartmentService} from '../../services/search-apartment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css']
})

/*
 * Responsible for apartment card on search page
 */
export class SearchItemComponent implements OnInit  {
  @Input() apartment: Apartment;
  imageIndex = 0;
  maxImageIndex = 0;

  constructor(public _apartmentService: SearchApartmentService, private router: Router) {}

  ngOnInit() {
    this.maxImageIndex = this.getApartmentImageCount(this.apartment.ApartmentId);
    this.imageIndex = this.getImageIndex(this.apartment.ApartmentId);
  }

  /*
   * Retrieves available image number
   * Calls service method.
   */
  getApartmentImageCount(id: number): number {
    const count = this._apartmentService.apartmentImageCount.get(id);
    if (count == null) {
      this._apartmentService.getApartmentImageCount(id).subscribe(data => this.maxImageIndex = data);
    } else {
      return count;
    }
  }

  /*
   * Stores Index of currently showed image.
   */
  getImageIndex(id: number): number {
    const index = this._apartmentService.apartmentImageIndex.get(id);

    if (index == null) {
      this._apartmentService.apartmentImageIndex.set(id, 0);
      return 0;
    } else {
      return index;
    }
  }

  /*
   * Show next image
   */
  next() {
    if (this.imageIndex < this.maxImageIndex) {
      this.imageIndex++;
      this._apartmentService.apartmentImageIndex.set(this.apartment.ApartmentId, this.imageIndex);
    }
  }

  /*
   * Show previous image
   */
  previous() {
    if (this.imageIndex > 0) {
      this.imageIndex--;
      this._apartmentService.apartmentImageIndex.set(this.apartment.ApartmentId, this.imageIndex);
    }
  }

  /*
   * Responsible for showing/hiding previous image button
   */
  hasPrevImage(): boolean {
    return this.imageIndex > 0;
  }

  /*
   * Responsible for showing/hiding next image button
   */
  hasNextImage(): boolean {
    return this.imageIndex < this.maxImageIndex - 1;
  }

  openApartmentPage() {
    this.router.navigate(['apartment/', this.apartment.ApartmentId]);
  }

}
