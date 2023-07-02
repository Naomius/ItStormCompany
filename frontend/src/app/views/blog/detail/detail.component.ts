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
    this.isLogged = this.authService.getIsLoggedIn();
  }


  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLogged: boolean) => {
      this.isLogged = isLogged;
    })
    this.activatedRoute.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params: Params) => this.articleService.getArticleDetail(params['url']))
      )
      .subscribe((data: DetailArticleType) => {
        this.articleDetail = data;
      })

    this.activatedRoute.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params: Params) => this.articleService.getRelatedArticle(params['url']))
      )
      .subscribe((data: ArticleType[]) => {
        this.articles = data;
        this.addedComments()
      })

  }

  addedComments() {
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
        this.comments = data.comments
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
        })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }


}
