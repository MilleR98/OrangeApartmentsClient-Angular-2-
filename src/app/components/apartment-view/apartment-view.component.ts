import { Apartment } from '../../models/apartment';
import { ApartmentTag } from '../../models/apartment-tag';
import { User } from '../../models/user';
import { SearchApartmentService } from '../../services/search-apartment.service';
import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ApartmentComent} from '../../models/apartment-coment';

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
  private tags: ApartmentTag[] = [];
  coments: ApartmentComent[] = [];
  coment: ApartmentComent;
  imageIndex: number;
  imageCount: number;

  constructor(private _route: ActivatedRoute, private _apartmentService: SearchApartmentService,  private _router: Router) { 
    this.coment = new ApartmentComent();
    this.tags = [];
    this.coments = [];
    this.apartment = new Apartment();
    this.user = new User();
    this.imageIndex = 0;
  }

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];

    if (this.id != null) {
      this._apartmentService.searchApartmentById(this.id)
                            .subscribe(data => {
                              if (data == null) {
                                this._router.navigate(['search']);
                              }
                              this.apartment = data.apartment;
                              this.user = data.user;
                              this.tags = data.tags;
                              this.coments = data.coments;
                            });
      this._apartmentService.getApartmentImageCount(this.id).subscribe(data => this.imageCount = data);
    }

    this._apartmentService.getApartmentImageCount(this.id).subscribe(data => this.imageCount = data);
  }

  addComment() {
    this._apartmentService.addApartmentComent(this.coment.Comment, this.id)
      .subscribe(data => {
        if (data.status === 200) {
          let apart = new ApartmentComent();
          apart.Comment = this.coment.Comment;
          apart.CommentDate = data.json().CommentDate;
          this.coments.push(apart);
          console.log('comment added');
        }
      });
  }

    /*
   * Show next image
   */
  next() {
    if (this.imageIndex < this.imageCount) {
      this.imageIndex++;
    }
  }

  /*
   * Show previous image
   */
  previous() {
    if (this.imageIndex > 0) {
      this.imageIndex--;
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
    return this.imageIndex < this.imageCount - 1;
  }

}
