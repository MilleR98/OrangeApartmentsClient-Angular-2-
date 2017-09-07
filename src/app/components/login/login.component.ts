import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AlertService} from '../../services/alert.service';
import {AuthService} from '../../services/auth.service';
declare let $: any;
import * as CryptoJS from 'crypto-js';

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
    console.log(this.model);
    const key = CryptoJS.enc.Base64.parse('HackersSeeIT2');
    const iv  = CryptoJS.enc.Base64.parse('#base64IV#');
    const encrypted = CryptoJS.AES.encrypt(this.model.password, key, {iv: iv});

    const secureUsercreds = {
      email: this.model.email,
      password: encrypted.toString()
    };

    console.log(secureUsercreds);
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
