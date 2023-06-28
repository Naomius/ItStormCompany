import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {UserInfoType} from "../../../../types/user-info.type";
import {DefaultResponseType} from "../../../../types/default-response.type";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  isLogged: boolean = false;
  userName: string = '';

  constructor(private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private userService: UserService) {

    this.isLogged = this.authService.getIsLoggedIn();
    this.getUserName();
  }



  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLogged: boolean) => {
      this.isLogged = isLogged;
      this.getUserName();
    })
  }

  getUserName(): void {
    if (this.isLogged) {
      this.userService.getUserInfo()
        .subscribe((data: UserInfoType | DefaultResponseType) => {
          this.userName = (data as UserInfoType).name
        })
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.doLogout();
      },
      error: () => {
        this.doLogout();
      }
    })
  }

  doLogout(): void {
    this.userName = '';
    this.authService.removeTokens();
    this.authService.userId = null;
    this._snackBar.open('Вы вышли из системы');
    this.router.navigate(['/']);
  }

}
