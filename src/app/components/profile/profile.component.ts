
import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['profile.component.css'],
})

export class ProfileComponent implements OnInit, OnDestroy {
  user = {};
  id: number;
  private sub: any;
  isCurrentUser: boolean;

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.isCurrentUser = false;
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id === +localStorage.getItem('currentUserId')){
        this.isCurrentUser = true;
      }
      this.userService.getUserInfo(this.id).subscribe((resp: Response) => {
        this.user = resp.json();
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.user = {};
  }
}
