import {AfterViewInit, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {ArticleType} from "../../../types/article-type";
import {ArticleService} from "../../shared/services/article.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment.development";
import {PopupOrderComponent} from "../../shared/components/popup-order/popup-order.component";
import {AuthService} from "../../core/auth/auth.service";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit{

  @ViewChild(PopupOrderComponent)
  private popupOrderComponent!: PopupOrderComponent;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 26,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      }
    },
  }

  reviewsOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 25,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      }
    },
  }

  popularArticles: ArticleType[] = [];
  serverStaticPath = environment.serverStaticPath;
  isLogged: boolean = false;

  constructor(private articleService: ArticleService,
              private router: Router,
              private authService: AuthService) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  openPopup(value: string): void {
    this.popupOrderComponent.openPopup(value)
  }

  ngOnInit(): void {
    this.articleService.getPopularArticles()
      .subscribe((data: ArticleType[]) => {
        this.popularArticles = data as ArticleType[];
      })
  }

  ngAfterViewInit(): void {

  }

}
