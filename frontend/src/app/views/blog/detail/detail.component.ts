import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ActivatedRoute, Params} from "@angular/router";
import {DetailArticleType, DetailCommentType} from "../../../../types/detail-article.type";
import {ArticleType} from "../../../../types/article-type";
import {Subject, switchMap, takeUntil} from "rxjs";
import {AuthService} from "../../../core/auth/auth.service";
import {CommentsService} from "../../../shared/services/comments.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserCommentActionType} from "../../../../types/user-info.type";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  articleDetail!: DetailArticleType;
  articles: ArticleType[] = [];
  comments: DetailCommentType[] = [];
  isLogged: boolean = false;
  textareaValue: string = '';
  destroy$ = new Subject();


  constructor(private articleService: ArticleService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private commentsService: CommentsService,
              private _snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
    this.isLogged = this.authService.getIsLoggedIn();

    this.authService.isLogged$.subscribe((isLogged: boolean) => {
      this.isLogged = isLogged;
    })
    setTimeout(() => {
      this.getArticleDetail()
    }, 100);
    this.getArticleDetail();
    this.activatedRoute.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params: Params) => this.articleService.getRelatedArticle(params['url']))
      )
      .subscribe((data: ArticleType[]) => {
        this.articles = data;

      })

  }

  getArticleDetail() {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params: Params) => this.articleService.getArticleDetail(params['url']))
      )
      .subscribe((data: DetailArticleType) => {
        this.articleDetail = data;
        this.comments = data.comments;
        if (this.isLogged) {
          this.commentsService.getArticleCommentActions({articleId: this.articleDetail.id})
            .subscribe((data: UserCommentActionType[] | DefaultResponseType) => {
              if ((data as DefaultResponseType).error !== undefined) {
                throw new Error((data as DefaultResponseType).message)
              }

              this.comments.map(item => {
                (data as UserCommentActionType[]).forEach(action => {
                  if (action.comment === item.id) {
                    item.action = action.action
                  }
                })
                return item;
              })

            })
        }
      })
  }

  getMoreComments() {
      const params = {
        offset: this.comments.length,
        article: this.articleDetail.id
      }

      this.commentsService.getComments(params)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(data => {
          console.log(data.comments)
          data.comments.forEach(item => {
            if (this.comments.length < data.allCount) {
              this.comments.push(item)
            }
          })
        })
  }

  addNewComment() {
    if (this.articleDetail) {
      this.commentsService.addNewComment(this.textareaValue, this.articleDetail.id)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe((data: DefaultResponseType) => {
          if (data.error) {
            const error = data.message;
            this._snackBar.open(error)
          }
          this.textareaValue = '';
          this._snackBar.open('Вы успешно оставили свой комментарий')
          this.getArticleDetail()
        })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }


}
