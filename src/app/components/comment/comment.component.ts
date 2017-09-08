import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {CommentModel} from '../../models/comment-model';

@Component({
  moduleId: module.id,
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit{

  @Input() comment: CommentModel;
  commentatorName;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserInfo(this.comment.CommentatorId)
      .map(response => response.json())
      .subscribe(data => this.commentatorName = data.FirstName + ' ' + data.LastName);
  }
}
