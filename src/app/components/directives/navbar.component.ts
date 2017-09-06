import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
	
  constructor(private authService: AuthService, private router: Router,) {}

  getCurrentUserName(): string {
    return localStorage.getItem('currentUserName');
  }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['home']);
  }

  goToMyProfile() {
    this.router.navigate(['/profile', +localStorage.getItem('currentUserId')]);
  }
}
