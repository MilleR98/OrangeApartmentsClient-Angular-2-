import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {CommentService} from '../../services/comment.service';
import {AuthService} from '../../services/auth.service';
declare let $: any;
@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['profile.component.css'],
})

export class ProfileComponent implements OnInit, OnDestroy {
  profileImageURL;
  user = {};
  id: number;
  private sub: any;
  private subUserInfo: any;
  private subAllUserApartment: any;
  private subComments: any;
  isCurrentUser: boolean;
  apartmentsList;
  commentList;
  constructor(private userService: UserService, private route: ActivatedRoute,
              private commentService: CommentService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isCurrentUser = false;
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id == +localStorage.getItem('currentUserId')) {
        this.isCurrentUser = true;
      }else {
        this.isCurrentUser = false;
      }
      this.subUserInfo = this.userService.getUserInfo(this.id).subscribe((resp: Response) => {
        this.user = resp.json();
        this.profileImageURL = 'http://localhost:52215/api/user/' + this.user['UserId'] + '/getimg?nocache=' + this.junk();
      });
      this.subAllUserApartment = this.userService.getAllUsersApartment(this.id)
        .subscribe(data => this.apartmentsList = data);
      this.subComments = this.commentService.getComments(this.id)
        .subscribe(data => this.commentList = data);
    });
  }

  junk() {
    return (new Date()).getTime() + Math.round(Math.random());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subUserInfo.unsubscribe();
    this.subAllUserApartment.unsubscribe();
    this.subComments.unsubscribe();
    this.user = {};
  }

  writeComment() {
    if (!this.authService.isLoggedIn()) {
      $('#login-modal').modal('show');
      return;
    }
    const comment = $('#commentArea').val();
    if (comment) {
      this.commentService.writeComment(this.id, localStorage.getItem('currentUserId'), comment)
        .subscribe(() => {
          this.commentService.getComments(this.id)
            .subscribe(data => this.commentList = data);
        });
    }
  }

  onMessageClick() {
    if (!this.authService.isLoggedIn()) {
      $('#login-modal').modal('show');
      return;
    }
  }
}
