import {Component, Input} from '@angular/core';
import {ArticleType} from "../../../../types/article-type";
import {environment} from "../../../../environments/environment.development";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {

  serverStaticPath = environment.serverStaticPath;

@Input () article!: ArticleType;

}
