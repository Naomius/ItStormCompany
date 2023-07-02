import {Component, Input, OnInit} from '@angular/core';
import {DetailCommentType} from "../../../../types/detail-article.type";
import {AuthService} from "../../../core/auth/auth.service";
import {CommentsService} from "../../services/comments.service";

@Component({
  selector: 'app-comments-card',
  templateUrl: './comments-card.component.html',
  styleUrls: ['./comments-card.component.scss']
})
export class CommentsCardComponent implements OnInit{

  @Input() comment!: DetailCommentType;
  isLogged: boolean = false;
  like: boolean = false;
  dislike: boolean = false;
  likeCount: number = 0;
  dislikeCount: number = 0;

  constructor(private authService: AuthService,
              private commentsService: CommentsService) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {
    this.likeCount = this.comment.likesCount;
    this.dislikeCount = this.comment.dislikesCount;
  }
}
