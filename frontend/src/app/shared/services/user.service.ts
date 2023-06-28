import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {UserInfoType} from "../../../types/user-info.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environments/environment.development";
import {AuthService} from "../../core/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getUserInfo(): Observable<UserInfoType | DefaultResponseType> {
    return this.http.get<UserInfoType | DefaultResponseType>(environment.api + 'users', {
      headers: new HttpHeaders({
        accessToken: 'auth-token'
      })
    });
  }

}
