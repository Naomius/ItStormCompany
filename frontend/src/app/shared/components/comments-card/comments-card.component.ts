import {Component, Input, OnInit} from '@angular/core';
import {DetailCommentType} from "../../../../types/detail-article.type";
import {AuthService} from "../../../core/auth/auth.service";
import {CommentsService} from "../../services/comments.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";


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
  likesCount: number = 0;
  dislikesCount: number = 0;
  actionLike = 'like';
  actionDislike = 'dislike';
  violate = 'violate';

  constructor(private authService: AuthService,
              private commentsService: CommentsService,
              private _snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.isLogged = this.authService.getIsLoggedIn();
    setTimeout(() => {
      this.checkEmotionsValue()
    }, 100);
    this.likesCount = this.comment.likesCount;
    this.dislikesCount = this.comment.dislikesCount;
  }

  checkEmotionsValue() {
    if (this.comment.action) {
      if (this.comment.action === this.actionLike) {
        this.like = true;
      }
      if (this.comment.action === this.actionDislike) {
        this.dislike = true;
      }
    }
  }

  addLike(): void {
    if (this.isLogged) {
      if (!this.like) {
        this.commentsService.postNewCommentAction(this.comment.id, this.actionLike)
          .subscribe(data => {
              if (this.dislike) {
                this.dislike = false;
                this.dislikesCount = --this.dislikesCount
              }
              this.like = true;
              this.dislike = false;
              this.likesCount = ++this.likesCount
              this._snackbar.open('Ваш голос учтен')

          })
      } else {
        this.commentsService.postNewCommentAction(this.comment.id, this.actionLike)
          .subscribe(data => {
            if (!data.error) {
              this.like = false;
              this.likesCount = --this.likesCount;
            }
          });
      }
    } else {
      this._snackbar.open('Необходимо авторизоваться')
    }
  }

  addDislike(): void {
    if (this.isLogged) {
      if (!this.dislike) {
        this.commentsService.postNewCommentAction(this.comment.id, this.actionDislike)
          .subscribe(data => {
            if (this.like) {
              this.like = false;
              this.likesCount = --this.likesCount;
            }
            this.dislike = true;
            this.dislikesCount = ++this.dislikesCount;
            this._snackbar.open('Ваш голос учтен')

          })
      } else {
        this.commentsService.postNewCommentAction(this.comment.id, this.actionLike)
          .subscribe(data => {
            if (!data.error) {
              this.dislike = false;
              this.dislikesCount = --this.dislikesCount;
            }
          });
      }
    } else {
      this._snackbar.open('Необходимо авторизоваться')
    }
  }

  addViolate() {
    if (this.isLogged) {
      this.commentsService.postNewCommentAction(this.comment.id, this.violate)
        .subscribe({
          next: (data: DefaultResponseType) => {
            if (!data.error) {
              this._snackbar.open('Жалоба отправлена');

            }
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackbar.open(errorResponse.error.message)
            } else {
              this._snackbar.open('Жалоба уже отправлена')
            }
          }
        })
    } else {
      this._snackbar.open('Необходимо авторизоваться')
    }
  }

}
