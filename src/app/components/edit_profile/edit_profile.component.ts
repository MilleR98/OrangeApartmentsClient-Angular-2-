
import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {AlertService} from '../../services/alert.service';
import {Router} from '@angular/router';
declare let $: any;

@Component({
  moduleId: module.id,
  selector: 'app-profile-edit',
  templateUrl: './edit_profile.component.html',
  styleUrls: ['./edit_profile.component.css'],
})

export class EditProfileComponent implements OnInit {
  profileImageURL;
  modelInfo: any = {};
  modelEmail: any = {};
  modelPass: any = {};
  responseInfoChangeShow: boolean;
  responseEmailChangeShow: boolean;
  responsePassChangeShow: boolean;
  responsePhotoChange: boolean;
  constructor(private userService: UserService, private alertService: AlertService, private route: Router) {}

  ngOnInit(): void {
    this.profileImageURL =
      'http://localhost:52215/api/user/' + localStorage.getItem('currentUserId') + '/getimg?nocache=' + this.junk();
    this.userService.getUserInfo(+localStorage.getItem('currentUserId')).subscribe((resp: Response) => {
      this.modelInfo = resp.json();
      console.log(this.modelInfo);
    });
  }

  updateInfo() {
    this.responseInfoChangeShow = true;
    this.responseEmailChangeShow = false;
    this.responsePassChangeShow = false;
    this.responsePhotoChange = false;
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
    this.responsePhotoChange = false;
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
    this.responsePhotoChange = false;
    console.log(this.modelEmail);
    this.userService.changeEmail(this.modelEmail).subscribe(
      data => {
        this.alertService.success('Email successfully changed');
      },
      error => {
        this.alertService.error(error._body);
      });
  }

  uploadUserProfileImage(event) {
    this.responseInfoChangeShow = false;
    this.responseEmailChangeShow = false;
    this.responsePassChangeShow = false;
    this.responsePhotoChange = true;
    const image = event.target.files[0];
    console.log(image);
    this.userService.uploadUserProfileImage(image, localStorage.getItem('currentUserId')).subscribe(
      response  => {this.alertService.success('Successfully change profile photo');
        this.profileImageURL =
          'http://localhost:52215/api/user/' + localStorage.getItem('currentUserId') + '/getimg?nocache=' + this.junk(); },
      error =>  {this.alertService.error(error._body); }
    );
  }

  junk() {
    return (new Date()).getTime() + Math.round(Math.random());
  }

  backToProfile() {
    this.route.navigate(['profile/' + localStorage.getItem('currentUserId')]);
  }
}
