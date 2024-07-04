import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appSettings } from '../settings/appSettings';
import { Observable } from 'rxjs';
import { ResponseLogin } from '../interfaces/ResponseLogin';
import { User } from '../interfaces/User';
import { Login } from '../interfaces/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http = inject(HttpClient);
  private baseUrl = appSettings.apiUrl;

  constructor() { }

  signup(object: Login): Observable<ResponseLogin>{
    return this.http.post<ResponseLogin>(`${this.baseUrl}Login/Register`, object)
  }

  login(object: Login): Observable<ResponseLogin>{
    return this.http.post<ResponseLogin>(`${this.baseUrl}Login/Login`, object)
  }

}
