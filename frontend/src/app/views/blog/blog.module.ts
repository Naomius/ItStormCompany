import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BlogComponent} from "./blog/blog.component";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {BlogRoutingModule} from "./blog-routing.module";
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [
    BlogComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    BlogRoutingModule
  ]
})
export class BlogModule { }
