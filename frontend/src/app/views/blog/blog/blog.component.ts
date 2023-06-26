import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleType} from "../../../../types/article-type";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {CategoriesService} from "../../../shared/services/categories.service";
import {CategoriesType} from "../../../../types/categories-type";
import {ActivatedRoute} from "@angular/router";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit{

  articles: ArticleType[] = [];
  activeParams: ActiveParamsType = {categories: []};
  categories: CategoriesType[] = [];

  constructor(private articleService: ArticleService,
              private categoriesService: CategoriesService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.processCatalog();
    this.articleService.getArticles(this.activeParams)
      .subscribe(data => {
        this.articles = data.items;
      })
  }

  processCatalog() {
    this.categoriesService.getCategories()
      .subscribe(data => {
        this.categories = data;

        this.activatedRoute.queryParams
          .pipe(
            debounceTime(500)
          )
          .subscribe(params => {

          })
      })
  }

}
