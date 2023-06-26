import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoriesType} from "../../../types/categories-type";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

    getCategories(): Observable<CategoriesType[]> {
    return this.http.get<CategoriesType[]>(environment.api + 'categories')
    }
}
