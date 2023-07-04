import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommentsParamType} from "../../../types/commentsParam.type";
import {Observable} from "rxjs";
import {DetailCommentType} from "../../../types/detail-article.type";
import {environment} from "../../../environments/environment.development";
import {DefaultResponseType} from "../../../types/default-response.type";
import {UserActionId, UserCommentActionType} from "../../../types/user-info.type";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) {}

  getComments(params: CommentsParamType): Observable<{allCount: number, comments: DetailCommentType[]}> {
    return this.http.get<{allCount: number, comments: DetailCommentType[]}>(environment.api + 'comments', {
      params: params
    });
  }

  addNewComment(text: string, article: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments', {
      text: text,
      article: article
    })
  }

  getArticleCommentActions(params: UserActionId): Observable<UserCommentActionType[] | DefaultResponseType> {
    return this.http.get<UserCommentActionType[] | DefaultResponseType>(environment.api + 'comments/article-comment-actions', {
      params: params
    })
  }

  postNewCommentAction(id: string, action: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments/' + id + '/apply-action', {
      action: action
    })
  }

}
