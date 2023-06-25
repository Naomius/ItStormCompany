import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {ArticleComponent} from "./components/article/article.component";



@NgModule({
  declarations: [
    ArticleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ArticleComponent]
})
export class SharedModule { }
