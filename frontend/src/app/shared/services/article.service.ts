import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActiveParamsType} from "../../../types/active-params.type";
import {Observable} from "rxjs";
import {ArticleType} from "../../../types/article-type";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {
  }

  getArticles(params: ActiveParamsType): Observable<{ count: number, pages: number, items: ArticleType[] }> {
    return this.http.get<{ count: number, pages: number, items: ArticleType[] }>(environment.api + 'articles', {params: params});
  }

  getPopularArticles(): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(environment.api + 'articles/top');
  }

}
