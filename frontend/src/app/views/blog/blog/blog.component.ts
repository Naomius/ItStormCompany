import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleType} from "../../../../types/article-type";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {CategoriesService} from "../../../shared/services/categories.service";
import {CategoriesType} from "../../../../types/categories-type";
import {ActivatedRoute, Router} from "@angular/router";
import {AppliedFilterType} from "../../../../types/applied-filter.type";
import {ActiveParamsUtil} from "../../../shared/utils/active-params.util";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  articles: ArticleType[] = [];
  activeParams: ActiveParamsType = {categories: []};
  categories: CategoriesType[] = [];
  pages: number[] = []
  appliedFilters: AppliedFilterType[] = [];
  sortingOpen: boolean = false;

  constructor(private articleService: ArticleService,
              private categoriesService: CategoriesService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.processCatalog()
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
            this.activeParams = ActiveParamsUtil.processParams(params);

            this.appliedFilters = [];
            this.activeParams.categories.forEach(url => {
              const foundCategory = this.categories.find(category => category.url === url);
              if (foundCategory) {
                this.appliedFilters.push({
                  name: foundCategory.name,
                  urlParam: foundCategory.url
                });
                foundCategory.activeFilter = true;
              }
            })
          });

        this.articleService.getArticles(this.activeParams)
          .subscribe(data => {
            this.pages = [];
            for (let i = 1; i <= data.pages; i++) {
              this.pages.push(i);
            }
            this.articles = data.items;
          })
      })
      }

  updateFilterParam(url: string) {
    if (this.activeParams.categories && this.activeParams.categories.length > 0) {
      const existingCategoryInParam = this.activeParams.categories.find(item => item === url);
      if (existingCategoryInParam) {
        this.categories.find(item => {
          if (item.url === url) {
            item.activeFilter = false
          }
        });
        this.activeParams.categories = this.activeParams.categories.filter(item => item !== url)
      } else if (!existingCategoryInParam) {
      this.categories.find(item => {
        if (item.url === url) {
          item.activeFilter = true
        }
      });
        this.activeParams.categories = [...this.activeParams.categories, url];
      }
    } else {
      this.activeParams.categories = [url];
    }

    this.activeParams.page = 1;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    })

  }




  removeAppliedFilter(appliedFilter: AppliedFilterType) {
    this.activeParams.categories = this.activeParams.categories.filter(item => item !== appliedFilter.urlParam)
    this.categories.find(item => {
      if (item.url === appliedFilter.urlParam) {
        item.activeFilter = false
      }
    })

    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    })
  }

  toggleSorting(): void {
    this.sortingOpen = !this.sortingOpen
  }

}
