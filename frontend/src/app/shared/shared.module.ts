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



@NgModule({
  declarations: [
    ArticleComponent,
    PopupOrderComponent,
    PopupConsultationComponent,
    CategoryFilterComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  exports: [
    ArticleComponent,
    PopupOrderComponent,
    PopupConsultationComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
