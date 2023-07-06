import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {ArticleComponent} from "./components/article/article.component";
import { PopupOrderComponent } from './components/popup-order/popup-order.component';
import {ReactiveFormsModule} from "@angular/forms";
import { PopupConsultationComponent } from './components/popup-consultation/popup-consultation.component';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { LoaderComponent } from './components/loader/loader.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { UserAgreementComponent } from './components/user-agreement/user-agreement.component';
import { CommentsCardComponent } from './components/comments-card/comments-card.component';
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";



@NgModule({
  declarations: [
    ArticleComponent,
    PopupOrderComponent,
    PopupConsultationComponent,
    CategoryFilterComponent,
    LoaderComponent,
    UserAgreementComponent,
    CommentsCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [provideNgxMask()],
  exports: [
    ArticleComponent,
    PopupOrderComponent,
    PopupConsultationComponent,
    LoaderComponent,
    CommentsCardComponent,
  ]
})
export class SharedModule { }
