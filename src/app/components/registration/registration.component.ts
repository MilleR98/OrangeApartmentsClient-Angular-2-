import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {AlertService} from '../../services/alert.service';
declare let $: any;


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
