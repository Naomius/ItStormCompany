import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class NewRequestsService {

  constructor(private http: HttpClient) { }

  getCreatOrder(name: string, phone: string, service: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'requests', {
      name: name,
      phone: phone,
      service: service,
      type: 'order'
    });
  }

  getConsultation(name: string, phone: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'requests', {
      name: name,
      phone: phone,
      type: 'consultation'
    });
  }

}
