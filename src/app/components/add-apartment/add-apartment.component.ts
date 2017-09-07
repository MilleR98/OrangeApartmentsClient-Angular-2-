import { Apartment } from '../../models/apartment';
import { ApartmentTag } from '../../models/apartment-tag';
import { ApartmentCreationService } from '../../services/apartment-creation.service';
import { SearchApartmentService } from '../../services/search-apartment.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.css']
})

export class AddApartmentComponent implements OnInit {
  model = new Apartment;
  aTitle: string;
  aCity: string;
  aDistrict: string;
  aStreet: string;
  aBuildingNumber: string;
  aFloor: number;
  aBedrooms: number;
  aSleepingPlaces: number;
  aSquare: number;
  aDescription: string;
  isApartmentCreated: boolean;
  aTags: ApartmentTag[];

  constructor(private _apartmentCreateService: ApartmentCreationService, 
                public _apartmentService: SearchApartmentService, 
                private router: Router) {}

  ngOnInit() {
    this.isApartmentCreated = true;
    this.model.FloorNumber = 4;
    this.model.City = "Lviv";
    this.model.Price = 555;
    this.model.Street = "Vodna";
    this.model.StreetNumber = "5A";
    this.aTags = [];
  }

  tagClick(tag: ApartmentTag) {
    if (tag.isSelected === true) {
      this.aTags.push(tag);
    } else {
      this.aTags.find((t, i) => {
        if (t.tagname === tag.tagname) { this.aTags.splice(i, 1); return true; }
      });
    }
  }

  createApartment() {
    this.isApartmentCreated = true;
    this._apartmentCreateService.createApartment(this.model).subscribe(data => {
      if (data.status === 201) {
         this.router.navigate(['search']);
      }
    });
  }

  getmodel() {
    return JSON.stringify(this.model);
  }
}
