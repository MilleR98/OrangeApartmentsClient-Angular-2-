import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import {User} from '../../models/user';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  currentUserToken: string;
  users: User[] = [];

  constructor(private userService: UserService) {
    this.currentUserToken = localStorage.getItem('currentUserToken');
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  private loadAllUsers() {
      //  this.userService.getAll().subscribe(users => { this.users = users; console.log(users); });
  }
}
