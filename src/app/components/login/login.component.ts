import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AlertService} from '../../services/alert.service';
import {AuthService} from '../../services/auth.service';
declare let $: any;

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  isSuccess: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.isSuccess = true;
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model)
      .subscribe(
        data => {
          this.isSuccess = true;
          this.router.navigate([this.returnUrl]);
          $('#login-modal').modal('hide');
        },
        error => {
          this.alertService.error(error._body, false);
          this.loading = false;
          this.isSuccess = false;
        });
  }
}
