import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/login-response';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClientService } from '../helpers/service/http-client.service';
import { map } from 'rxjs/internal/operators/map';
import { JAN } from '@angular/material/core';
import Constants from '../helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUserSubject: BehaviorSubject<LoginResponse>;
  private loggedInUser: Observable<LoginResponse>;
  constructor(private httpClientService: HttpClientService) {
    this.loggedInUserSubject = new BehaviorSubject<LoginResponse>(JSON.parse(localStorage.getItem("user")));
    this.loggedInUser = this.loggedInUserSubject.asObservable();
  }

  public getLoggedInUser(): LoginResponse {
    return this.loggedInUserSubject.value;
  }

  login(username: string, password: string) {
    const headers = [];
    headers.push({ key: Constants.userId, value: username })
    headers.push({ key: Constants.userPassword, value: password })
    return this.httpClientService.post("user/authenticate", {}, headers)
      .pipe(
        map(res => {
          if (res.statusCode === 200) {
            sessionStorage.setItem(Constants.accessToken_lsKey, JSON.stringify(res.data.accessToken));
            sessionStorage.setItem(Constants.loggedInUser_lsKey, JSON.stringify(res.data));
            this.loggedInUserSubject.next(res.data)
          }
          return res;
        })
      );
  }
  logout() {
    sessionStorage.removeItem(Constants.accessToken_lsKey);
    sessionStorage.removeItem(Constants.loggedInUser_lsKey);
    this.loggedInUserSubject.next(null);
  }
}
