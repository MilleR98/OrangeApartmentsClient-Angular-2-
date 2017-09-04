
import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';

@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['profile.component.css'],
})

export class ProfileComponent implements OnInit {
  user = {};
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log(this.userService.getCurrentUser());
    console.log(this.user);
  }
}
