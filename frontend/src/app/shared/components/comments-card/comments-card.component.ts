import {Component, Input} from '@angular/core';
import {DetailCommentType} from "../../../../types/detail-article.type";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'app-comments-card',
  templateUrl: './comments-card.component.html',
  styleUrls: ['./comments-card.component.scss']
})
export class CommentsCardComponent {

  @Input() comment!: DetailCommentType;
  isLogged: boolean = false;

  constructor(private authService: AuthService) {
    this.isLogged = this.authService.getIsLoggedIn();
  }
}
