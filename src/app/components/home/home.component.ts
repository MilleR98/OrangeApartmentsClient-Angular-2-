import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import {User} from '../../models/user';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../app.component.css'],
})

export class HomeComponent implements OnInit {
  currentUser: string;
  users: User[] = [];

  constructor(private userService: UserService) {
    this.currentUser = localStorage.getItem('currentUser');
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
  }
}
