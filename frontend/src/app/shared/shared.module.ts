import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {ArticleComponent} from "./components/article/article.component";
import { PopupOrderComponent } from './components/popup-order/popup-order.component';
import {ReactiveFormsModule} from "@angular/forms";
import { PopupConsultationComponent } from './components/popup-consultation/popup-consultation.component';



@NgModule({
  declarations: [
    ArticleComponent,
    PopupOrderComponent,
    PopupConsultationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    ArticleComponent,
    PopupOrderComponent,
    PopupConsultationComponent
  ]
})
export class SharedModule { }
