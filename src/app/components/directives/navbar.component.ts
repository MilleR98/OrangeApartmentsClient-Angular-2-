import { Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  constructor(public authService: AuthService) {}
}