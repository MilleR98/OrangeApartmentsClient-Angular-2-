import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {AlertService} from '../../services/alert.service';
declare let $: any;
import * as CryptoJS from 'crypto-js';

@Component({
  moduleId: module.id,
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})

export class RegistrationComponent implements OnInit {

  model: any = {};
  loading = false;
  isSuccess: boolean;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.isSuccess = true;
  }

  register() {
    this.loading = true;
    const key = CryptoJS.enc.Base64.parse('HackersSeeIT2');
    const iv  = CryptoJS.enc.Base64.parse('#base64IV#');
    const encryptedPass = CryptoJS.AES.encrypt(this.model.password, key, {iv: iv});
    const encryptedConfirmPass = CryptoJS.AES.encrypt(this.model.confirmpassword, key, {iv: iv});

    const secureUsercreds = {
      firstname: this.model.firstname,
      lastname: this.model.lastname,
      email: this.model.email,
      password: encryptedPass.toString(),
      confirmpassword: encryptedConfirmPass.toString()
    };

    console.log(secureUsercreds);
    this.userService.register(this.model)
      .subscribe(
        data => {
          this.isSuccess = true;
          $('#registration-modal').modal('hide');
          $('#login-modal').modal('show');
        },
        error => {
          this.alertService.error(error._body);
          this.loading = false;
          this.isSuccess = false;
        });
  }
}
