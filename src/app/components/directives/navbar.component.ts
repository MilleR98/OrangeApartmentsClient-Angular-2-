import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  constructor(private authService: AuthService) {}

  getCurrentUserName(): string {
    return localStorage.getItem('currentUserName');
  }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
