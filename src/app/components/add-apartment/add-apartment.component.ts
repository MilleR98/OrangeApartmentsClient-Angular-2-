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
  isApartmentCreated: boolean;
  aTags: ApartmentTag[];
  apartmentId: number = 0;
  constructor(private _apartmentCreateService: ApartmentCreationService,
                public _apartmentService: SearchApartmentService,
                private router: Router) {}

  ngOnInit() {
    this.isApartmentCreated = true;
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
          this.apartmentId = data.json().ApartmentId;
      }
    });
  }

  imageURL() {
    return 'http://localhost:52215/api/apartment/' + this.apartmentId.toString() + '/SaveImg';
  }

  getmodel() {
    return JSON.stringify(this.model);
  }
}
