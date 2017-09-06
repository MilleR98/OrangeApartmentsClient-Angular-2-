
import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {AlertService} from '../../services/alert.service';

@Component({
  moduleId: module.id,
  selector: 'app-profile-edit',
  templateUrl: './edit_profile.component.html',
  styleUrls: ['./edit_profile.component.css'],
})

export class EditProfileComponent implements OnInit {
  modelInfo: any = {};
  modelEmail: any = {};
  modelPass: any = {};
  responseInfoChangeShow: boolean;
  responseEmailChangeShow: boolean;
  responsePassChangeShow: boolean;
  constructor(private userService: UserService, private alertService: AlertService) {}

  ngOnInit(): void {
    this.userService.getUserInfo(+localStorage.getItem('currentUserId')).subscribe((resp: Response) => {
      this.modelInfo = resp.json();
      console.log(this.modelInfo);
    });
  }

  updateInfo() {
    this.responseInfoChangeShow = true;
    this.responseEmailChangeShow = false;
    this.responsePassChangeShow = false;
    console.log(this.modelInfo);
    this.userService.updateCurrentUser(+localStorage.getItem('currentUserId'), this.modelInfo).subscribe(
      data => {
        this.alertService.success('New data saved');
      },
      error => {
        this.alertService.error(error._body);
      });
  }

  changePassword() {
    this.responseInfoChangeShow = false;
    this.responseEmailChangeShow = false;
    this.responsePassChangeShow = true;
    console.log(this.modelPass);
    this.userService.changePassword(this.modelPass).subscribe(
      data => {
        this.alertService.success('Password successfully changed');
      },
      error => {
        this.alertService.error(error._body);
      });
  }

  changeEmail() {
    this.responseInfoChangeShow = false;
    this.responseEmailChangeShow = true;
    this.responsePassChangeShow = false;
    console.log(this.modelEmail);
    this.userService.changeEmail(this.modelEmail).subscribe(
      data => {
        this.alertService.success('Email successfully changed');
      },
      error => {
        this.alertService.error(error._body);
      });
  }
}
