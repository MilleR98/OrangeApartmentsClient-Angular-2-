import { Apartment } from '../../models/apartment';
import { ApartmentTag } from '../../models/apartment-tag';
import { User } from '../../models/user';
import { SearchApartmentService } from '../../services/search-apartment.service';
import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-apartment-view',
  templateUrl: './apartment-view.component.html',
  styleUrls: ['./apartment-view.component.css']
})

export class ApartmentViewComponent implements OnInit {
  id: number;
  apartment: Apartment;
  user: User;
  tags: ApartmentTag[];
  imageIndex: number;
  imageCount: number;

  constructor(private _route: ActivatedRoute, private _apartmentService: SearchApartmentService, private _userService: UserService) { }

  ngOnInit() {
    this.apartment = new Apartment();
    this.user = new User();
    this.id = this._route.snapshot.params['id'];
    this.imageIndex = 0;
    if (this.id != null) {
      this._apartmentService.searchApartmentById(this.id).subscribe(data => {this.apartment = data; this.getUser(this.apartment.UserID);});
      this._apartmentService.getApartmentImageCount(this.id).subscribe(data => this.imageCount = data);
    }
  }

  getUser(id: number) {
    this._apartmentService.getUserInfol(id).subscribe(data => this.user = data);
  }

}
